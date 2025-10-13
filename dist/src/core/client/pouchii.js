"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PouchiiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchiiNetworkError = exports.PouchiiConfigurationError = exports.PouchiiClientNotReadyError = exports.PouchiiAuthenticationError = exports.PouchiiService = void 0;
const pouchii_sdk_1 = __importStar(require("@bluupayhq/pouchii-sdk"));
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const bun_1 = require("bun");
const date_fns_1 = require("date-fns");
class PouchiiAuthenticationError extends Error {
    authError;
    statusCode;
    constructor(message, authError, statusCode) {
        super(message);
        this.authError = authError;
        this.statusCode = statusCode;
        this.name = 'PouchiiAuthenticationError';
    }
}
exports.PouchiiAuthenticationError = PouchiiAuthenticationError;
class PouchiiNetworkError extends Error {
    statusCode;
    response;
    constructor(message, statusCode, response) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;
        this.name = 'PouchiiNetworkError';
    }
}
exports.PouchiiNetworkError = PouchiiNetworkError;
class PouchiiConfigurationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PouchiiConfigurationError';
    }
}
exports.PouchiiConfigurationError = PouchiiConfigurationError;
class PouchiiClientNotReadyError extends Error {
    constructor(message = 'Pouchii client is not initialized. Call initializePouchii() first.') {
        super(message);
        this.name = 'PouchiiClientNotReadyError';
    }
}
exports.PouchiiClientNotReadyError = PouchiiClientNotReadyError;
const POUCHII_CONFIG = {
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
};
const CACHE_KEYS = {
    AUTH_TOKEN: 'pouchii:auth-token',
    REFRESH_TOKEN: 'pouchii:refresh-token',
    TOKEN_METADATA: 'pouchii:token-metadata',
    LAST_REFRESH: 'pouchii:last-refresh',
};
class CacheService {
    static get = async (key) => bun_1.redis.get(key);
    static set = async (key, value, ttl) => {
        await bun_1.redis.set(key, value);
        if (ttl)
            await bun_1.redis.expire(key, ttl);
    };
    static delete = async (key) => await bun_1.redis.del(...key);
    static ttl = async (key) => await bun_1.redis.ttl(key);
}
let PouchiiService = PouchiiService_1 = class PouchiiService {
    logger = new common_1.Logger(PouchiiService_1.name);
    CACHE_TTL = {
        AUTH_TOKEN: (0, date_fns_1.hoursToSeconds)(POUCHII_CONFIG.AUTH_TOKEN_EXPIRY_HOURS),
        REFRESH_TOKEN: (0, date_fns_1.hoursToSeconds)(POUCHII_CONFIG.REFRESH_TOKEN_EXPIRY_HOURS),
    };
    REQUEST_TIMEOUT = 50000;
    MAX_RETRY_ATTEMPTS = 3;
    RETRY_DELAY_MS = 1000;
    REFRESH_THRESHOLD_MINUTES = POUCHII_CONFIG.REFRESH_BEFORE_EXPIRY_MINUTES;
    http;
    isInitializing = false;
    isInitialized = false;
    initializationPromise = null;
    _pouchiiClient;
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
        }
        catch (error) {
            this.logger.error('Failed to initialize PouchiiService', error);
        }
    }
    get pouchiiClient() {
        if (!this._pouchiiClient || !this.isInitialized) {
            throw new PouchiiClientNotReadyError();
        }
        return this._pouchiiClient;
    }
    get isClientReady() {
        return !!(this._pouchiiClient && this.isInitialized);
    }
    getClientSafe() {
        return this.isClientReady ? this._pouchiiClient : undefined;
    }
    async waitForClient(timeoutMs = 30000) {
        if (this.isClientReady) {
            return this._pouchiiClient;
        }
        if (this.isInitializing && this.initializationPromise) {
            await this.initializationPromise;
            if (this.isClientReady) {
                return this._pouchiiClient;
            }
        }
        if (!this.isInitializing) {
            await this.initializePouchii();
            if (this.isClientReady) {
                return this._pouchiiClient;
            }
        }
        throw new PouchiiClientNotReadyError('Failed to initialize Pouchii client within timeout');
    }
    createHttpClient() {
        const client = axios_1.default.create({
            headers: {
                'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
                'Content-Type': 'application/json',
            },
        });
        client.interceptors.request.use((config) => {
            this.logger.debug(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            this.logger.error('Request interceptor error:', error);
            return Promise.reject(error);
        });
        client.interceptors.response.use((response) => {
            this.logger.debug(`Response received: ${response.status} ${response.statusText}`);
            return response;
        }, (error) => {
            this.logger.error('Response interceptor error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            return Promise.reject(error);
        });
        return client;
    }
    validateConfiguration() {
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
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    async pouchiiFetch(url, options = {}, retryCount = 0) {
        const axiosConfig = {
            method: options.method || 'GET',
            url,
            headers: {
                ...options.headers,
                'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
                'Content-Type': 'application/json',
            },
            data: {
                ...(options.body ? JSON.parse(options.body) : {}),
                ...POUCHII_CONFIG.REQUEST_PARAMS,
            },
        };
        try {
            const response = await this.http.request(axiosConfig);
            this.logger.debug('Request data:', response.config.data);
            this.logger.log('Response data:', response.data?.data);
            return this.createSuccessResponse(response);
        }
        catch (error) {
            this.logger.error(error);
            const axiosError = error;
            if (this.shouldRetry(axiosError, retryCount)) {
                await this.delay(this.RETRY_DELAY_MS * Math.pow(2, retryCount));
                return this.pouchiiFetch(url, options, retryCount + 1);
            }
            return this.createErrorResponse(axiosError);
        }
    }
    shouldRetry(error, retryCount) {
        if (retryCount >= this.MAX_RETRY_ATTEMPTS) {
            return false;
        }
        const status = error.response?.status;
        const retryableStatuses = [408, 429, 500, 502, 503, 504];
        const networkErrors = ['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'];
        return (!status ||
            retryableStatuses.includes(status) ||
            networkErrors.some(code => error.code === code));
    }
    createSuccessResponse(axiosResponse) {
        return {
            ok: axiosResponse.status >= 200 && axiosResponse.status < 300,
            status: axiosResponse.status,
            statusText: axiosResponse.statusText,
            json: async () => axiosResponse.data,
            text: async () => JSON.stringify(axiosResponse.data),
            headers: new Headers(axiosResponse.headers),
            url: axiosResponse.config.url || '',
            redirected: false,
            type: 'basic',
            body: null,
            bodyUsed: false,
        };
    }
    createErrorResponse(error) {
        const status = error.response?.status || 500;
        const statusText = error.response?.statusText || 'Internal Server Error';
        return {
            ok: false,
            status,
            statusText,
            json: async () => this.formatErrorResponse(error),
            text: async () => JSON.stringify(this.formatErrorResponse(error)),
            headers: new Headers(error.response?.headers || {}),
            url: error.config?.url || '',
            redirected: false,
            type: 'basic',
            body: null,
            bodyUsed: false,
        };
    }
    formatErrorResponse(error) {
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
    async updateAuthTokens(authData) {
        const now = Date.now();
        const tokenMetadata = {
            createdAt: now,
            lastRefresh: now,
            expiresAt: now + (this.CACHE_TTL.AUTH_TOKEN * 1000),
            refreshExpiresAt: now + (this.CACHE_TTL.REFRESH_TOKEN * 1000),
        };
        await Promise.all([
            CacheService.set(CACHE_KEYS.AUTH_TOKEN, authData.data.authorization.token, this.CACHE_TTL.AUTH_TOKEN),
            CacheService.set(CACHE_KEYS.REFRESH_TOKEN, authData.data.authorization.refreshToken, this.CACHE_TTL.REFRESH_TOKEN),
            CacheService.set(CACHE_KEYS.TOKEN_METADATA, JSON.stringify(tokenMetadata), this.CACHE_TTL.REFRESH_TOKEN),
        ]);
        this.logger.debug('Auth tokens updated successfully', { tokenMetadata });
    }
    async needsTokenRefresh() {
        const tokenTtl = await CacheService.ttl(CACHE_KEYS.AUTH_TOKEN);
        if (tokenTtl === null || tokenTtl <= 0) {
            return true;
        }
        const refreshThresholdSeconds = (0, date_fns_1.minutesToSeconds)(this.REFRESH_THRESHOLD_MINUTES);
        return tokenTtl <= refreshThresholdSeconds;
    }
    async handleAuthToken() {
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
            }
            catch (error) {
                this.logger.warn('Proactive refresh failed, falling back to cached token', error);
                return cachedToken;
            }
        }
        return await this.performInitialAuthentication();
    }
    async performInitialAuthentication() {
        this.logger.debug('Performing initial authentication');
        try {
            const response = await this.http.post(`${POUCHII_CONFIG.BASE_URL}${POUCHII_CONFIG.AUTH_ENDPOINT}`, {
                ...POUCHII_CONFIG.CREDENTIALS,
                ...POUCHII_CONFIG.REQUEST_PARAMS,
                rememberMe: true,
            });
            const authData = response.data;
            await this.updateAuthTokens(authData);
            this.logger.debug('Initial authentication successful');
            return authData.data.authorization.token;
        }
        catch (error) {
            const axiosError = error;
            if (this.isAuthenticationError(axiosError)) {
                throw new PouchiiAuthenticationError('Initial authentication failed', axiosError.response?.data, axiosError.response?.status);
            }
            this.logger.error('Initial authentication failed', axiosError);
            throw new PouchiiNetworkError(`Authentication failed: ${axiosError.message}`, axiosError.response?.status, axiosError.response?.data);
        }
    }
    async performTokenRefresh() {
        const refreshToken = await CacheService.get(CACHE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            this.logger.debug('No refresh token available, performing initial authentication');
            return await this.performInitialAuthentication();
        }
        this.logger.debug('Refreshing auth token');
        try {
            const response = await this.http.get(`${POUCHII_CONFIG.BASE_URL}${POUCHII_CONFIG.REFRESH_ENDPOINT}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'refresh-authorization-token': refreshToken,
                },
            });
            const authData = response.data;
            await this.updateAuthTokens(authData);
            this.logger.debug('Token refresh successful');
            return authData.data.authorization.token;
        }
        catch (error) {
            const axiosError = error;
            this.logger.error('Token refresh failed', axiosError);
            await this.clearAuthCache();
            return await this.performInitialAuthentication();
        }
    }
    isAuthenticationError(error) {
        const status = error.response?.status;
        return status === 401 || status === 403;
    }
    async handleAuthenticationExpiry(error) {
        const authError = error.error;
        this.logger.error('Authentication expiry detected', { authError });
        if (authError.requiredLogout &&
            authError.requireLogin &&
            authError.responseMessage === 'Session Expired') {
            return await this.performTokenRefresh();
        }
        if (authError.requireRefreshToken) {
            return await this.performTokenRefresh();
        }
        throw new PouchiiAuthenticationError('Unhandled authentication error', authError);
    }
    async fetchWithAuthRetry(url, options = {}) {
        try {
            const response = await this.pouchiiFetch(url, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new PouchiiNetworkError(`Request failed with status ${response.status}`, response.status, errorData);
            }
            return response;
        }
        catch (error) {
            this.logger.error('FetchWithAuthRetry error', { error, url });
            if (error instanceof pouchii_sdk_1.AuthenticationError) {
                return await this.handleAuthenticationError(url, options);
            }
            if (error instanceof PouchiiNetworkError && error.statusCode === 401) {
                return await this.handleAuthenticationError(url, options);
            }
            throw error;
        }
    }
    async handleAuthenticationError(url, options = {}) {
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
        }
        catch (error) {
            this.logger.error('Token refresh failed during error handling', error);
            await this.clearAuthCache();
            throw new PouchiiAuthenticationError('Authentication failed after token refresh attempt');
        }
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async initializePouchii(options = {}) {
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
        }
        catch (error) {
            this.isInitialized = false;
            this._pouchiiClient = undefined;
            throw error;
        }
        finally {
            this.isInitializing = false;
            this.initializationPromise = null;
        }
    }
    async performInitialization(options) {
        this.logger.debug('Starting Pouchii initialization');
        const { forceRefresh = false, retryAttempts = this.MAX_RETRY_ATTEMPTS } = options;
        if (forceRefresh) {
            await this.clearAuthCache();
        }
        let lastError = null;
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
            try {
                const bearerToken = await this.handleAuthToken();
                this._pouchiiClient = new pouchii_sdk_1.default({
                    apiKey: bearerToken,
                    baseurl: POUCHII_CONFIG.BASE_URL,
                    environment: 'staging',
                    defaultHeaders: {
                        'User-Agent': POUCHII_CONFIG.REQUEST_PARAMS.requestPartnerCode,
                        'Content-Type': 'application/json',
                    },
                    fetch: (url, options) => this.fetchWithAuthRetry(url, {
                        ...options,
                        headers: {
                            ...options?.headers,
                            Authorization: `Bearer ${bearerToken}`,
                            Accept: "application/json, text/plain, */*",
                            "Accept-Encoding": "gzip, compress, deflate, br",
                        },
                    })
                });
                if (!this._pouchiiClient) {
                    throw new Error('Failed to create Pouchii client instance');
                }
                this.logger.debug('✅ Pouchii client created successfully');
                return;
            }
            catch (error) {
                lastError = error;
                this.logger.error(`Initialization attempt ${attempt} failed`, error);
                this._pouchiiClient = undefined;
                if (attempt < retryAttempts) {
                    const delay = (options.retryDelay || this.RETRY_DELAY_MS) * Math.pow(2, attempt - 1);
                    this.logger.debug(`Retrying initialization in ${delay}ms...`);
                    await this.delay(delay);
                }
            }
        }
        throw new PouchiiConfigurationError(`Failed to initialize Pouchii after ${retryAttempts} attempts: ${lastError?.message}`);
    }
    async clearAuthCache() {
        this.logger.debug('Clearing authentication cache');
        await CacheService.delete([
            CACHE_KEYS.AUTH_TOKEN,
            CACHE_KEYS.REFRESH_TOKEN,
            CACHE_KEYS.TOKEN_METADATA,
            CACHE_KEYS.LAST_REFRESH,
        ]);
        this.logger.debug('Authentication cache cleared');
    }
    async isAuthenticated() {
        const token = await CacheService.get(CACHE_KEYS.AUTH_TOKEN);
        const tokenTtl = await CacheService.ttl(CACHE_KEYS.AUTH_TOKEN);
        return !!(token && tokenTtl && tokenTtl > 0);
    }
    async getAuthStatus() {
        const [token, refreshToken, tokenTtl, refreshTtl, metadata] = await Promise.all([
            CacheService.get(CACHE_KEYS.AUTH_TOKEN),
            CacheService.get(CACHE_KEYS.REFRESH_TOKEN),
            CacheService.ttl(CACHE_KEYS.AUTH_TOKEN),
            CacheService.ttl(CACHE_KEYS.REFRESH_TOKEN),
            CacheService.get(CACHE_KEYS.TOKEN_METADATA),
        ]);
        const isAuthenticated = !!(token && tokenTtl && tokenTtl > 0);
        const needsRefresh = tokenTtl !== null && tokenTtl <= (0, date_fns_1.minutesToSeconds)(this.REFRESH_THRESHOLD_MINUTES);
        return {
            isAuthenticated,
            tokenExpiry: tokenTtl,
            refreshTokenExpiry: refreshTtl,
            needsRefresh,
            timeUntilExpiry: tokenTtl,
            isClientReady: this.isClientReady,
        };
    }
    async forceTokenRefresh() {
        this.logger.debug('Forcing token refresh');
        const newToken = await this.performTokenRefresh();
        if (this._pouchiiClient) {
        }
        return newToken;
    }
    async getCurrentToken() {
        return await CacheService.get(CACHE_KEYS.AUTH_TOKEN);
    }
    async healthCheck() {
        try {
            const authStatus = await this.getAuthStatus();
            let status = 'healthy';
            if (!authStatus.isAuthenticated || !authStatus.isClientReady) {
                status = 'unhealthy';
            }
            else if (authStatus.needsRefresh) {
                status = 'degraded';
            }
            return {
                status,
                details: {
                    ...authStatus,
                    timestamp: new Date().toISOString(),
                },
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                details: {
                    error: error.message,
                    timestamp: new Date().toISOString(),
                },
            };
        }
    }
    async shutdown() {
        this.logger.debug('Shutting down PouchiiService');
        this.isInitializing = false;
        this.isInitialized = false;
        await this.clearAuthCache();
        this._pouchiiClient = undefined;
        this.logger.debug('PouchiiService shutdown complete');
    }
    async reinitialize() {
        this.logger.debug('Reinitializing Pouchii client');
        await this.shutdown();
        await this.initializePouchii({ forceRefresh: true });
    }
};
exports.PouchiiService = PouchiiService;
exports.PouchiiService = PouchiiService = PouchiiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PouchiiService);
//# sourceMappingURL=pouchii.js.map