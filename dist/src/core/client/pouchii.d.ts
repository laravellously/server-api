import Pouchii from '@bluupayhq/pouchii-sdk';
import { OnModuleInit } from '@nestjs/common';
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
interface AuthStatus {
    isAuthenticated: boolean;
    tokenExpiry: number | null;
    refreshTokenExpiry: number | null;
    needsRefresh: boolean;
    timeUntilExpiry: number | null;
    isClientReady: boolean;
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
declare class PouchiiAuthenticationError extends Error {
    readonly authError?: AuthError | undefined;
    readonly statusCode?: number | undefined;
    constructor(message: string, authError?: AuthError | undefined, statusCode?: number | undefined);
}
declare class PouchiiNetworkError extends Error {
    readonly statusCode?: number | undefined;
    readonly response?: unknown | undefined;
    constructor(message: string, statusCode?: number | undefined, response?: unknown | undefined);
}
declare class PouchiiConfigurationError extends Error {
    constructor(message: string);
}
declare class PouchiiClientNotReadyError extends Error {
    constructor(message?: string);
}
export declare class PouchiiService implements OnModuleInit {
    private readonly logger;
    private readonly CACHE_TTL;
    private readonly REQUEST_TIMEOUT;
    private readonly MAX_RETRY_ATTEMPTS;
    private readonly RETRY_DELAY_MS;
    private readonly REFRESH_THRESHOLD_MINUTES;
    private readonly http;
    private isInitializing;
    private isInitialized;
    private initializationPromise;
    private _pouchiiClient;
    constructor();
    onModuleInit(): Promise<void>;
    get pouchiiClient(): Pouchii;
    get isClientReady(): boolean;
    getClientSafe(): Pouchii | undefined;
    waitForClient(timeoutMs?: number): Promise<Pouchii>;
    private createHttpClient;
    private validateConfiguration;
    private getNestedProperty;
    private pouchiiFetch;
    private shouldRetry;
    private createSuccessResponse;
    private createErrorResponse;
    private formatErrorResponse;
    private updateAuthTokens;
    private needsTokenRefresh;
    private handleAuthToken;
    private performInitialAuthentication;
    private performTokenRefresh;
    private isAuthenticationError;
    private handleAuthenticationExpiry;
    private fetchWithAuthRetry;
    private handleAuthenticationError;
    private delay;
    initializePouchii(options?: PouchiiInitializationOptions): Promise<void>;
    private performInitialization;
    clearAuthCache(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    getAuthStatus(): Promise<AuthStatus>;
    forceTokenRefresh(): Promise<string>;
    getCurrentToken(): Promise<string | null>;
    healthCheck(): Promise<{
        status: 'healthy' | 'unhealthy' | 'degraded';
        details: Record<string, unknown>;
    }>;
    shutdown(): Promise<void>;
    reinitialize(): Promise<void>;
}
export type { AuthCacheData, AuthError, AuthResponse, AuthStatus, ErrorResponse, PouchiiInitializationOptions };
export { PouchiiAuthenticationError, PouchiiClientNotReadyError, PouchiiConfigurationError, PouchiiNetworkError };
