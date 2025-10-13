import Pouchii, { AuthenticationError } from '@bluupayhq/pouchii-sdk';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { redis } from 'bun';
import { hoursToSeconds, minutesToSeconds } from 'date-fns';

// Enhanced type definitions
interface AuthCacheData {
  token: string;
  refreshToken: string;
  createdAt: number;
  expiredAt: number;
  tokenType: string;
}

interface AuthResponse {
  data: {
    authorization: AuthCacheData;
  };
  success?: boolean;
  message?: string;
}

interface AuthError {
  requiredLogout: boolean;
  requireLogin: boolean;
  requireRefreshToken: boolean;
  requiredVerification: boolean;
  responseMessage: string;
  errorCode?: string;
  timestamp?: string;
}

interface PouchiiConfig {
  readonly BASE_URL: string;
  readonly AUTH_ENDPOINT: string;
  readonly REFRESH_ENDPOINT: string;
  readonly CREDENTIALS: {
    readonly username: string;
    readonly password: string;
  };
  readonly REQUEST_PARAMS: {
    readonly requestChannel: string;
    readonly requestChannelId: string;
    readonly requestChannelType: string;
    readonly requestPartnerCode: string;
    readonly requestApplicationCode: string;
    readonly requestApplicationModule: string;
  };
  readonly AUTH_TOKEN_EXPIRY_HOURS: number;
  readonly REFRESH_TOKEN_EXPIRY_HOURS: number;
  readonly REFRESH_BEFORE_EXPIRY_MINUTES: number;
}

interface AuthStatus {
  isAuthenticated: boolean;
  tokenExpiry: number | null;
  refreshTokenExpiry: number | null;
  needsRefresh: boolean;
  timeUntilExpiry: number | null;
  isClientReady: boolean;
}

interface CacheTTL {
  readonly AUTH_TOKEN: number;
  readonly REFRESH_TOKEN: number;
}

interface ErrorResponse {
  error: boolean;
  message: string;
  code: number;
  details: Record<string, unknown>;
  timestamp: string;
  retryAfter?: number;
}

interface PouchiiInitializationOptions {
  forceRefresh?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
  autoRetry?: boolean;
}

// Custom error classes
class PouchiiAuthenticationError extends Error {
  constructor(
    message: string,
    public readonly authError?: AuthError,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'PouchiiAuthenticationError';
  }
}

class PouchiiNetworkError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = 'PouchiiNetworkError';
  }
}

class PouchiiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PouchiiConfigurationError';
  }
}

class PouchiiClientNotReadyError extends Error {
  constructor(message: string = 'Pouchii client is not initialized. Call initializePouchii() first.') {
    super(message);
    this.name = 'PouchiiClientNotReadyError';
  }
}

// Configuration constants
const POUCHII_CONFIG: PouchiiConfig = {
  BASE_URL: 'https://stagingapi.pouchii.net',
  AUTH_ENDPOINT: '/identityservice/rest/api/integration/authentication/credential',
  REFRESH_ENDPOINT: '/identityservice/rest/api/authenticate/refresh/token',
  CREDENTIALS: {
    username: "PUB_STSL_E6HBKG80DO7VIC9",
    password: "DH/+KK6YcX69KhM5Xtlpdr3jd0M1bROJe0Qc8VY6VLs="
  },
  REQUEST_PARAMS: {
    requestChannel: 'Api',
    requestChannelId: 'BLUU',
    requestChannelType: 'Integrator',
    requestPartnerCode: 'BLUU',
    requestApplicationCode: 'POUCHII',
    requestApplicationModule: 'INTEGRATOR',
  },
  AUTH_TOKEN_EXPIRY_HOURS: 6.5,
  REFRESH_TOKEN_EXPIRY_HOURS: 7,
  REFRESH_BEFORE_EXPIRY_MINUTES: 30,
} as const;

// Cache keys constants
const CACHE_KEYS = {
  AUTH_TOKEN: 'pouchii:auth-token',
  REFRESH_TOKEN: 'pouchii:refresh-token',
  TOKEN_METADATA: 'pouchii:token-metadata',
  LAST_REFRESH: 'pouchii:last-refresh',
} as const;

class CacheService {
  static get = async (key: string) => redis.get(key)
  static set = async (key: string, value: any, ttl?: number) => {
    await redis.set(key, value);
    if (ttl) await redis.expire(key, ttl);
  }
  static delete = async (key: string[]) => await redis.del(...key);
  static ttl = async (key: string) => await redis.ttl(key)
}

@Injectable()
export class PouchiiService implements OnModuleInit {
  private readonly logger = new Logger(PouchiiService.name);

  private readonly CACHE_TTL: CacheTTL = {
    AUTH_TOKEN: hoursToSeconds(POUCHII_CONFIG.AUTH_TOKEN_EXPIRY_HOURS),
    REFRESH_TOKEN: hoursToSeconds(POUCHII_CONFIG.REFRESH_TOKEN_EXPIRY_HOURS),
  };

  private readonly REQUEST_TIMEOUT = 50000;
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY_MS = 1000;
  private readonly REFRESH_THRESHOLD_MINUTES = POUCHII_CONFIG.REFRESH_BEFORE_EXPIRY_MINUTES;

  private readonly http: AxiosInstance;
  private isInitializing = false;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  // Make pouchiiClient private and provide controlled access
  private _pouchiiClient: Pouchii | undefined;

  constructor() {
    this.http = this.createHttpClient();
    this.validateConfiguration();
  }
  async onModuleInit() {
    this.logger.debug('Initializing PouchiiService...');
    
    try {
      await this.initializePouchii({
        retryAttempts: 3,
        retryDelay: 2000,
        autoRetry: true
      });
      
      // this.logger.log('PouchiiService initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize PouchiiService', error);
      // Don't throw here - let the service start in a degraded state
      // The service will attempt to recover on subsequent requests
    }
  }

  /**
   * Get the Pouchii client with automatic initialization check
   */
  public get pouchiiClient(): Pouchii {
    if (!this._pouchiiClient || !this.isInitialized) {
      throw new PouchiiClientNotReadyError();
    }
    return this._pouchiiClient;
  }

  /**
   * Check if client is ready without throwing
   */
  public get isClientReady(): boolean {
    return !!(this._pouchiiClient && this.isInitialized);
  }

  /**
   * Get client safely (returns undefined if not ready)
   */
  public getClientSafe(): Pouchii | undefined {
    return this.isClientReady ? this._pouchiiClient : undefined;
  }

  /**
   * Wait for client to be ready
   */
  public async waitForClient(timeoutMs: number = 30000): Promise<Pouchii> {
    if (this.isClientReady) {
      return this._pouchiiClient!;
    }

    if (this.isInitializing && this.initializationPromise) {
      await this.initializationPromise;
      if (this.isClientReady) {
        return this._pouchiiClient!;
      }
    }

    // Auto-initialize if not initializing
    if (!this.isInitializing) {
      await this.initializePouchii();
      if (this.isClientReady) {
        return this._pouchiiClient!;
      }
    }

    throw new PouchiiClientNotReadyError('Failed to initialize Pouchii client within timeout');
  }

  /**
   * Creates and configures the Axios HTTP client
   */
  private createHttpClient(): AxiosInstance {
    const client = axios.create({
      // timeout: this.REQUEST_TIMEOUT,
      headers: {
        'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
        'Content-Type': 'application/json',
      },
      // httpsAgent: agent
    });

    client.interceptors.request.use(
      (config) => {
        this.logger.debug(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        this.logger.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (response) => {
        this.logger.debug(`Response received: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        this.logger.error('Response interceptor error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );

    return client;
  }

  /**
   * Validates the service configuration
   */
  private validateConfiguration(): void {
    const requiredFields = [
      'BASE_URL',
      'AUTH_ENDPOINT',
      'REFRESH_ENDPOINT',
      'CREDENTIALS.username',
      'CREDENTIALS.password'
    ];

    for (const field of requiredFields) {
      const value = this.getNestedProperty(POUCHII_CONFIG, field);
      if (!value) {
        throw new PouchiiConfigurationError(`Missing required configuration: ${field}`);
      }
    }
  }

  /**
   * Helper method to get nested object properties
   */
  private getNestedProperty(obj: any, path: string): unknown {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Enhanced fetch method with better error handling and retry logic
   */
  private async pouchiiFetch(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<Response> {
    const axiosConfig: AxiosRequestConfig = {
      method: (options.method as any) || 'GET',
      url,
      // httpsAgent: agent,
      headers: {
        ...(options.headers as Record<string, string>),
        'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
        'Content-Type': 'application/json',
      },
      data: {
        ...(options.body ? JSON.parse(options.body as string) : {}),
        ...POUCHII_CONFIG.REQUEST_PARAMS,
      },
      // timeout: this.REQUEST_TIMEOUT,
    };

    try {
      const response: AxiosResponse = await this.http.request(axiosConfig);

      this.logger.debug('Request data:', response.config.data);
      this.logger.log('Response data:', response.data?.data);

      return this.createSuccessResponse(response);
    } catch (error: unknown) {
      this.logger.error(error)
      const axiosError = error as AxiosError;

      // this.logger.error(`PouchiiFetch error (attempt ${retryCount + 1}):`, {
      //   message: axiosError.message,
      //   status: axiosError.response?.status,
      //   url,
      //   retryCount
      // });

      if (this.shouldRetry(axiosError, retryCount)) {
        await this.delay(this.RETRY_DELAY_MS * Math.pow(2, retryCount));
        return this.pouchiiFetch(url, options, retryCount + 1);
      }

      return this.createErrorResponse(axiosError);
    }
  }

  private shouldRetry(error: AxiosError, retryCount: number): boolean {
    if (retryCount >= this.MAX_RETRY_ATTEMPTS) {
      return false;
    }

    const status = error.response?.status;
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    const networkErrors = ['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'];

    return (
      !status ||
      retryableStatuses.includes(status) ||
      networkErrors.some(code => error.code === code)
    );
  }

  private createSuccessResponse(axiosResponse: AxiosResponse): Response {
    return {
      ok: axiosResponse.status >= 200 && axiosResponse.status < 300,
      status: axiosResponse.status,
      statusText: axiosResponse.statusText,
      json: async () => axiosResponse.data,
      text: async () => JSON.stringify(axiosResponse.data),
      headers: new Headers(axiosResponse.headers as Record<string, string>),
      url: axiosResponse.config.url || '',
      redirected: false,
      type: 'basic',
      body: null,
      bodyUsed: false,
    } as Response;
  }

  private createErrorResponse(error: AxiosError): Response {
    const status = error.response?.status || 500;
    const statusText = error.response?.statusText || 'Internal Server Error';

    return {
      ok: false,
      status,
      statusText,
      json: async () => this.formatErrorResponse(error),
      text: async () => JSON.stringify(this.formatErrorResponse(error)),
      headers: new Headers((error.response?.headers as Record<string, string>) || {}),
      url: error.config?.url || '',
      redirected: false,
      type: 'basic',
      body: null,
      bodyUsed: false,
    } as Response;
  }

  private formatErrorResponse(error: AxiosError): ErrorResponse {
    const status = error.response?.status || 500;

    return {
      error: true,
      message: error.message || 'Unknown error occurred',
      code: status,
      details: {
        responseData: error.response?.data || {},
        requestUrl: error.config?.url,
        requestMethod: error.config?.method,
        errorCode: error.code,
      },
      timestamp: new Date().toISOString(),
      retryAfter: status === 429 ? 60 : undefined,
    };
  }

  private async updateAuthTokens(authData: AuthResponse): Promise<void> {
    const now = Date.now();
    const tokenMetadata = {
      createdAt: now,
      lastRefresh: now,
      expiresAt: now + (this.CACHE_TTL.AUTH_TOKEN * 1000),
      refreshExpiresAt: now + (this.CACHE_TTL.REFRESH_TOKEN * 1000),
    };

    await Promise.all([
      CacheService.set(
        CACHE_KEYS.AUTH_TOKEN,
        authData.data.authorization.token,
        this.CACHE_TTL.AUTH_TOKEN
      ),
      CacheService.set(
        CACHE_KEYS.REFRESH_TOKEN,
        authData.data.authorization.refreshToken,
        this.CACHE_TTL.REFRESH_TOKEN
      ),
      CacheService.set(
        CACHE_KEYS.TOKEN_METADATA,
        JSON.stringify(tokenMetadata),
        this.CACHE_TTL.REFRESH_TOKEN
      ),
    ]);

    this.logger.debug('Auth tokens updated successfully', { tokenMetadata });
  }

  private async needsTokenRefresh(): Promise<boolean> {
    const tokenTtl = await CacheService.ttl(CACHE_KEYS.AUTH_TOKEN);
    if (tokenTtl === null || tokenTtl <= 0) {
      return true;
    }

    const refreshThresholdSeconds = minutesToSeconds(this.REFRESH_THRESHOLD_MINUTES);
    return tokenTtl <= refreshThresholdSeconds;
  }

  private async handleAuthToken(): Promise<string> {
    this.logger.debug('Handling auth token');

    const cachedToken = await CacheService.get(CACHE_KEYS.AUTH_TOKEN);
    const needsRefresh = await this.needsTokenRefresh();

    if (cachedToken && !needsRefresh) {
      this.logger.debug('Using cached auth token');
      return cachedToken;
    }

    if (cachedToken && needsRefresh) {
      this.logger.debug('Token needs refresh, attempting proactive refresh');
      try {
        return await this.performTokenRefresh();
      } catch (error) {
        this.logger.warn('Proactive refresh failed, falling back to cached token', error);
        return cachedToken;
      }
    }

    return await this.performInitialAuthentication();
  }

  private async performInitialAuthentication(): Promise<string> {
    this.logger.debug('Performing initial authentication');

    try {
      const response: AxiosResponse<AuthResponse> = await this.http.post(
        `${POUCHII_CONFIG.BASE_URL}${POUCHII_CONFIG.AUTH_ENDPOINT}`,
        {
          ...POUCHII_CONFIG.CREDENTIALS,
          ...POUCHII_CONFIG.REQUEST_PARAMS,
          rememberMe: true,
        }
      );

      const authData = response.data;
      await this.updateAuthTokens(authData);

      this.logger.debug('Initial authentication successful');
      return authData.data.authorization.token;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (this.isAuthenticationError(axiosError)) {
        throw new PouchiiAuthenticationError(
          'Initial authentication failed',
          axiosError.response?.data as AuthError,
          axiosError.response?.status
        );
      }

      this.logger.error('Initial authentication failed', axiosError);
      throw new PouchiiNetworkError(
        `Authentication failed: ${axiosError.message}`,
        axiosError.response?.status,
        axiosError.response?.data
      );
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = await CacheService.get(CACHE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      this.logger.debug('No refresh token available, performing initial authentication');
      return await this.performInitialAuthentication();
    }

    this.logger.debug('Refreshing auth token');

    try {
      const response: AxiosResponse<AuthResponse> = await this.http.get(
        `${POUCHII_CONFIG.BASE_URL}${POUCHII_CONFIG.REFRESH_ENDPOINT}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'refresh-authorization-token': refreshToken,
          },
        }
      );

      const authData = response.data;
      await this.updateAuthTokens(authData);

      this.logger.debug('Token refresh successful');
      return authData.data.authorization.token;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      this.logger.error('Token refresh failed', axiosError);
      await this.clearAuthCache();
      return await this.performInitialAuthentication();
    }
  }

  private isAuthenticationError(error: AxiosError): boolean {
    const status = error.response?.status;
    return status === 401 || status === 403;
  }

  private async handleAuthenticationExpiry(error: AuthenticationError): Promise<string> {
    const authError = error.error as AuthError;

    this.logger.error('Authentication expiry detected', { authError });

    if (
      authError.requiredLogout &&
      authError.requireLogin &&
      authError.responseMessage === 'Session Expired'
    ) {
      return await this.performTokenRefresh();
    }

    if (authError.requireRefreshToken) {
      return await this.performTokenRefresh();
    }

    throw new PouchiiAuthenticationError(
      'Unhandled authentication error',
      authError
    );
  }

  private async fetchWithAuthRetry(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    try {
      const response = await this.pouchiiFetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new PouchiiNetworkError(
          `Request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      return response;
    } catch (error: unknown) {
      this.logger.error('FetchWithAuthRetry error', { error, url });

      if (error instanceof AuthenticationError) {
        return await this.handleAuthenticationError(url, options);
      }

      if (error instanceof PouchiiNetworkError && error.statusCode === 401) {
        return await this.handleAuthenticationError(url, options);
      }

      throw error;
    }
  }

  private async handleAuthenticationError(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    try {
      this.logger.debug('Handling authentication error, attempting token refresh');

      const newToken = await this.performTokenRefresh();

      return await this.pouchiiFetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } catch (error: unknown) {
      this.logger.error('Token refresh failed during error handling', error);
      await this.clearAuthCache();

      throw new PouchiiAuthenticationError(
        'Authentication failed after token refresh attempt'
      );
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Initialize Pouchii client with enhanced options
   */
  public async initializePouchii(options: PouchiiInitializationOptions = {}): Promise<void> {
    if (this.isInitializing && this.initializationPromise) {
      this.logger.debug('Initialization already in progress, waiting...');
      return this.initializationPromise;
    }

    if (this.isInitialized && this._pouchiiClient && !options.forceRefresh) {
      this.logger.debug('Pouchii client already initialized');
      return;
    }

    this.isInitializing = true;
    this.isInitialized = false;
    this.initializationPromise = this.performInitialization(options);

    try {
      await this.initializationPromise;
      this.isInitialized = true;
      this.logger.debug('✅ Pouchii client initialization completed and marked as ready');
    } catch (error) {
      this.isInitialized = false;
      this._pouchiiClient = undefined;
      throw error;
    } finally {
      this.isInitializing = false;
      this.initializationPromise = null;
    }
  }

  private async performInitialization(options: PouchiiInitializationOptions): Promise<void> {
    this.logger.debug('Starting Pouchii initialization');

    const { forceRefresh = false, retryAttempts = this.MAX_RETRY_ATTEMPTS } = options;

    if (forceRefresh) {
      await this.clearAuthCache();
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const bearerToken = await this.handleAuthToken();

        this._pouchiiClient = new Pouchii({
          // baseURL: POUCHII_CONFIG.BASE_URL,
          apiKey: bearerToken,
          baseurl: POUCHII_CONFIG.BASE_URL,
          environment: 'staging',
          // timeout: this.REQUEST_TIMEOUT,
          defaultHeaders: {
            'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${bearerToken}`,
          },
          fetch: (url: any, options?: RequestInit) => this.fetchWithAuthRetry(url, {
            ...options,
            headers: {
              ...options?.headers,
              Authorization: `Bearer ${bearerToken}`,
              Accept: "application/json, text/plain, */*",
              "Accept-Encoding": "gzip, compress, deflate, br",
            },
          })
        });

        // Verify the client is properly initialized
        if (!this._pouchiiClient) {
          throw new Error('Failed to create Pouchii client instance');
        }

        this.logger.debug('✅ Pouchii client created successfully');
        return;
      } catch (error: unknown) {
        lastError = error as Error;
        this.logger.error(`Initialization attempt ${attempt} failed`, error);

        // Clean up failed client
        this._pouchiiClient = undefined;

        if (attempt < retryAttempts) {
          const delay = (options.retryDelay || this.RETRY_DELAY_MS) * Math.pow(2, attempt - 1);
          this.logger.debug(`Retrying initialization in ${delay}ms...`);
          await this.delay(delay);
        }
      }
    }

    throw new PouchiiConfigurationError(
      `Failed to initialize Pouchii after ${retryAttempts} attempts: ${lastError?.message}`
    );
  }

  public async clearAuthCache(): Promise<void> {
    this.logger.debug('Clearing authentication cache');

    await CacheService.delete([
      CACHE_KEYS.AUTH_TOKEN,
      CACHE_KEYS.REFRESH_TOKEN,
      CACHE_KEYS.TOKEN_METADATA,
      CACHE_KEYS.LAST_REFRESH,
    ]);

    this.logger.debug('Authentication cache cleared');
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = await CacheService.get(CACHE_KEYS.AUTH_TOKEN);
    const tokenTtl = await CacheService.ttl(CACHE_KEYS.AUTH_TOKEN);

    return !!(token && tokenTtl && tokenTtl > 0);
  }

  public async getAuthStatus(): Promise<AuthStatus> {
    const [token, refreshToken, tokenTtl, refreshTtl, metadata] = await Promise.all([
      CacheService.get(CACHE_KEYS.AUTH_TOKEN),
      CacheService.get(CACHE_KEYS.REFRESH_TOKEN),
      CacheService.ttl(CACHE_KEYS.AUTH_TOKEN),
      CacheService.ttl(CACHE_KEYS.REFRESH_TOKEN),
      CacheService.get(CACHE_KEYS.TOKEN_METADATA),
    ]);

    const isAuthenticated = !!(token && tokenTtl && tokenTtl > 0);
    const needsRefresh = tokenTtl !== null && tokenTtl <= minutesToSeconds(this.REFRESH_THRESHOLD_MINUTES);

    return {
      isAuthenticated,
      tokenExpiry: tokenTtl,
      refreshTokenExpiry: refreshTtl,
      needsRefresh,
      timeUntilExpiry: tokenTtl,
      isClientReady: this.isClientReady,
    };
  }

  public async forceTokenRefresh(): Promise<string> {
    this.logger.debug('Forcing token refresh');
    const newToken = await this.performTokenRefresh();

    // Update client with new token if it exists
    if (this._pouchiiClient) {
      // You may need to update the client's authorization header here
      // depending on how the Pouchii SDK handles token updates
    }

    return newToken;
  }

  public async getCurrentToken(): Promise<string | null> {
    return await CacheService.get(CACHE_KEYS.AUTH_TOKEN);
  }

  public async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy' | 'degraded';
    details: Record<string, unknown>;
  }> {
    try {
      const authStatus = await this.getAuthStatus();

      let status: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';

      if (!authStatus.isAuthenticated || !authStatus.isClientReady) {
        status = 'unhealthy';
      } else if (authStatus.needsRefresh) {
        status = 'degraded';
      }

      return {
        status,
        details: {
          ...authStatus,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: (error as Error).message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  public async shutdown(): Promise<void> {
    this.logger.debug('Shutting down PouchiiService');

    this.isInitializing = false;
    this.isInitialized = false;

    await this.clearAuthCache();
    this._pouchiiClient = undefined;

    this.logger.debug('PouchiiService shutdown complete');
  }

  /**
   * Reinitialize the client (useful for error recovery)
   */
  public async reinitialize(): Promise<void> {
    this.logger.debug('Reinitializing Pouchii client');
    await this.shutdown();
    await this.initializePouchii({ forceRefresh: true });
  }
}

// Export types for external use
export type {
  AuthCacheData, AuthError, AuthResponse, AuthStatus, ErrorResponse, PouchiiInitializationOptions
};

// Export custom errors
export {
  PouchiiAuthenticationError, PouchiiClientNotReadyError, PouchiiConfigurationError, PouchiiNetworkError
};

