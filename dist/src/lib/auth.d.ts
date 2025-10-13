import { type User } from "better-auth";
import { Pool } from "pg";
export declare const auth: import("better-auth").Auth<{
    appName: string | undefined;
    database: Pool;
    trustedOrigins: string[] | undefined;
    secret: string | undefined;
    baseURL: string | undefined;
    basePath: string;
    disabledPaths: string[];
    emailAndPassword: {
        enabled: boolean;
        disableSignUp: boolean;
        requireEmailVerification: boolean;
        minPasswordLength: number;
        maxPasswordLength: number;
        autoSignIn: boolean;
        sendResetPassword: (data: {
            url: string;
            user: User;
        }, request?: Request) => Promise<void>;
    };
    hooks: {};
    user: {
        changeEmail: {
            enabled: boolean;
            sendChangeEmailVerification: ({ user, newEmail, url, token }: {
                user: any;
                newEmail: any;
                url: any;
                token: any;
            }) => Promise<void>;
        };
        deleteUser: {
            enabled: boolean;
            sendDeleteAccountVerification: ({ user, url, token }: {
                user: any;
                url: any;
                token: any;
            }) => Promise<void>;
            beforeDelete: (user: any) => Promise<void>;
            afterDelete: (user: any) => Promise<void>;
        };
    };
    emailVerification: {
        sendOnSignUp: boolean;
        autoSignInAfterVerification: boolean;
        expiresIn: number;
        sendVerificationEmail: (data: {
            url: string;
            user: User;
        }, request?: Request) => Promise<void>;
    };
    session: {
        cookieName: string;
        cookieCache: {
            enabled: boolean;
            maxAge: number;
        };
        maxAge: number;
        updateAge: number;
        cookieAttributes: {
            secure: boolean;
            httpOnly: boolean;
            sameSite: string;
        };
    };
    advanced: {
        database: {
            generateId(): string;
        };
        cookiePrefix: string | undefined;
        useSecureCookies: boolean;
        crossSubDomainCookies: {
            enabled: boolean;
            domain: string;
        };
        defaultCookieAttributes: {
            httpOnly: boolean;
            secure: boolean;
        };
        cookies: {
            session_token: {
                name: string;
                attributes: {
                    httpOnly: boolean;
                    secure: boolean;
                };
            };
        };
    };
    secondaryStorage: {
        get: (key: string) => Promise<string | null>;
        set: (key: string, value: any, ttl?: number) => Promise<void>;
        delete: (key: string) => Promise<void>;
    };
    telemetry: {
        enabled: boolean;
    };
    plugins: ({
        id: "username";
        init(ctx: import("better-auth").AuthContext): {
            options: {
                databaseHooks: {
                    user: {
                        create: {
                            before(user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            } & Record<string, unknown>, context: import("better-auth").GenericEndpointContext | undefined): Promise<{
                                data: {
                                    displayUsername?: string | undefined;
                                    username?: string | undefined;
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            }>;
                        };
                        update: {
                            before(user: Partial<{
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            }> & Record<string, unknown>, context: import("better-auth").GenericEndpointContext | undefined): Promise<{
                                data: {
                                    displayUsername?: string | undefined;
                                    username?: string | undefined;
                                    id?: string | undefined;
                                    createdAt?: Date | undefined;
                                    updatedAt?: Date | undefined;
                                    email?: string | undefined;
                                    emailVerified?: boolean | undefined;
                                    name?: string | undefined;
                                    image?: string | null | undefined;
                                };
                            }>;
                        };
                    };
                };
            };
        };
        endpoints: {
            signInUsername: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        username: string;
                        password: string;
                        rememberMe?: boolean | undefined;
                        callbackURL?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            username: string;
                            displayUsername: string;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    } | null;
                } : {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        username: string;
                        displayUsername: string;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        username: import("better-auth").ZodString;
                        password: import("better-auth").ZodString;
                        rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    token: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                                422: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    message: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/sign-in/username";
            };
            isUsernameAvailable: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        username: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        available: boolean;
                    };
                } : {
                    available: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        username: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                } & {
                    use: any[];
                };
                path: "/is-username-available";
            };
        };
        schema: {
            user: {
                fields: {
                    username: {
                        type: "string";
                        required: false;
                        sortable: true;
                        unique: true;
                        returned: true;
                        transform: {
                            input(value: packages_core_dist_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                        };
                    };
                    displayUsername: {
                        type: "string";
                        required: false;
                        transform: {
                            input(value: packages_core_dist_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                        };
                    };
                };
            };
        };
        hooks: {
            before: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>;
            }[];
        };
        $ERROR_CODES: {
            readonly INVALID_USERNAME_OR_PASSWORD: "Invalid username or password";
            readonly EMAIL_NOT_VERIFIED: "Email not verified";
            readonly UNEXPECTED_ERROR: "Unexpected error";
            readonly USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.";
            readonly USERNAME_TOO_SHORT: "Username is too short";
            readonly USERNAME_TOO_LONG: "Username is too long";
            readonly INVALID_USERNAME: "Username is invalid";
            readonly INVALID_DISPLAY_USERNAME: "Display username is invalid";
        };
    } | {
        id: "magic-link";
        endpoints: {
            signInMagicLink: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        email: string;
                        name?: string | undefined;
                        callbackURL?: string | undefined;
                        newUserCallbackURL?: string | undefined;
                        errorCallbackURL?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    requireHeaders: true;
                    body: import("better-auth").ZodObject<{
                        email: import("better-auth").ZodString;
                        name: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/sign-in/magic-link";
            };
            magicLinkVerify: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        token: string;
                        callbackURL?: string | undefined;
                        errorCallbackURL?: string | undefined;
                        newUserCallbackURL?: string | undefined;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    };
                } : {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                    requireHeaders: true;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/magic-link/verify";
            };
        };
        rateLimit: {
            pathMatcher(path: string): boolean;
            window: number;
            max: number;
        }[];
    } | {
        id: "api-key";
        $ERROR_CODES: {
            INVALID_METADATA_TYPE: string;
            REFILL_AMOUNT_AND_INTERVAL_REQUIRED: string;
            REFILL_INTERVAL_AND_AMOUNT_REQUIRED: string;
            USER_BANNED: string;
            UNAUTHORIZED_SESSION: string;
            KEY_NOT_FOUND: string;
            KEY_DISABLED: string;
            KEY_EXPIRED: string;
            USAGE_EXCEEDED: string;
            KEY_NOT_RECOVERABLE: string;
            EXPIRES_IN_IS_TOO_SMALL: string;
            EXPIRES_IN_IS_TOO_LARGE: string;
            INVALID_REMAINING: string;
            INVALID_PREFIX_LENGTH: string;
            INVALID_NAME_LENGTH: string;
            METADATA_DISABLED: string;
            RATE_LIMIT_EXCEEDED: string;
            NO_VALUES_TO_UPDATE: string;
            KEY_DISABLED_EXPIRATION: string;
            INVALID_API_KEY: string;
            INVALID_USER_ID_FROM_API_KEY: string;
            INVALID_API_KEY_GETTER_RETURN_TYPE: string;
            SERVER_ONLY_PROPERTY: string;
            FAILED_TO_UPDATE_API_KEY: string;
            NAME_REQUIRED: string;
        };
        hooks: {
            before: {
                matcher: (ctx: import("better-auth").HookEndpointContext) => boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                    session: {
                        id: string;
                        token: string;
                        userId: string;
                        userAgent: string | null;
                        ipAddress: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        expiresAt: Date;
                    };
                } | {
                    context: import("better-auth").MiddlewareContext<import("better-auth").MiddlewareOptions, import("better-auth").AuthContext & {
                        returned?: unknown;
                        responseHeaders?: Headers;
                    }>;
                }>;
            }[];
        };
        endpoints: {
            createApiKey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        name?: string | undefined;
                        expiresIn?: number | null | undefined;
                        userId?: unknown;
                        prefix?: string | undefined;
                        remaining?: number | null | undefined;
                        metadata?: any;
                        refillAmount?: number | undefined;
                        refillInterval?: number | undefined;
                        rateLimitTimeWindow?: number | undefined;
                        rateLimitMax?: number | undefined;
                        rateLimitEnabled?: boolean | undefined;
                        permissions?: Record<string, string[]> | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        key: string;
                        metadata: any;
                        permissions: any;
                        id: string;
                        name: string | null;
                        start: string | null;
                        prefix: string | null;
                        userId: string;
                        refillInterval: number | null;
                        refillAmount: number | null;
                        lastRefillAt: Date | null;
                        enabled: boolean;
                        rateLimitEnabled: boolean;
                        rateLimitTimeWindow: number | null;
                        rateLimitMax: number | null;
                        requestCount: number;
                        remaining: number | null;
                        lastRequest: Date | null;
                        expiresAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } : {
                    key: string;
                    metadata: any;
                    permissions: any;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        name: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        expiresIn: import("better-auth").ZodDefault<import("better-auth").ZodNullable<import("better-auth").ZodOptional<import("better-auth").ZodNumber>>>;
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                        prefix: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        remaining: import("better-auth").ZodDefault<import("better-auth").ZodNullable<import("better-auth").ZodOptional<import("better-auth").ZodNumber>>>;
                        metadata: import("better-auth").ZodOptional<import("better-auth").ZodAny>;
                        refillAmount: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        refillInterval: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        rateLimitTimeWindow: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        rateLimitMax: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        rateLimitEnabled: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        permissions: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    prefix: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    start: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    key: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    enabled: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    lastRefillAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRequest: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    metadata: {
                                                        type: string;
                                                        nullable: boolean;
                                                        additionalProperties: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitMax: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitTimeWindow: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    remaining: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    refillAmount: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    refillInterval: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitEnabled: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    requestCount: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    permissions: {
                                                        type: string;
                                                        nullable: boolean;
                                                        additionalProperties: {
                                                            type: string;
                                                            items: {
                                                                type: string;
                                                            };
                                                        };
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/create";
            };
            verifyApiKey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        key: string;
                        permissions?: Record<string, string[]> | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        valid: boolean;
                        error: {
                            message: string | undefined;
                            code: string;
                        };
                        key: null;
                    } | {
                        valid: boolean;
                        error: null;
                        key: Omit<{
                            id: string;
                            name: string | null;
                            start: string | null;
                            prefix: string | null;
                            key: string;
                            userId: string;
                            refillInterval: number | null;
                            refillAmount: number | null;
                            lastRefillAt: Date | null;
                            enabled: boolean;
                            rateLimitEnabled: boolean;
                            rateLimitTimeWindow: number | null;
                            rateLimitMax: number | null;
                            requestCount: number;
                            remaining: number | null;
                            lastRequest: Date | null;
                            expiresAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            metadata: Record<string, any> | null;
                            permissions?: {
                                [key: string]: string[];
                            } | null;
                        }, "key"> | null;
                    };
                } : {
                    valid: boolean;
                    error: {
                        message: string | undefined;
                        code: string;
                    };
                    key: null;
                } | {
                    valid: boolean;
                    error: null;
                    key: Omit<{
                        id: string;
                        name: string | null;
                        start: string | null;
                        prefix: string | null;
                        key: string;
                        userId: string;
                        refillInterval: number | null;
                        refillAmount: number | null;
                        lastRefillAt: Date | null;
                        enabled: boolean;
                        rateLimitEnabled: boolean;
                        rateLimitTimeWindow: number | null;
                        rateLimitMax: number | null;
                        requestCount: number;
                        remaining: number | null;
                        lastRequest: Date | null;
                        expiresAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        metadata: Record<string, any> | null;
                        permissions?: {
                            [key: string]: string[];
                        } | null;
                    }, "key"> | null;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        key: import("better-auth").ZodString;
                        permissions: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        SERVER_ONLY: true;
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/verify";
            };
            getApiKey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        id: string;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        permissions: {
                            [key: string]: string[];
                        } | null;
                        id: string;
                        name: string | null;
                        start: string | null;
                        prefix: string | null;
                        userId: string;
                        refillInterval: number | null;
                        refillAmount: number | null;
                        lastRefillAt: Date | null;
                        enabled: boolean;
                        rateLimitEnabled: boolean;
                        rateLimitTimeWindow: number | null;
                        rateLimitMax: number | null;
                        requestCount: number;
                        remaining: number | null;
                        lastRequest: Date | null;
                        expiresAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        metadata: Record<string, any> | null;
                    };
                } : {
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    start: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    prefix: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    refillInterval: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    refillAmount: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRefillAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    enabled: {
                                                        type: string;
                                                        description: string;
                                                        default: boolean;
                                                    };
                                                    rateLimitEnabled: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    rateLimitTimeWindow: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitMax: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    requestCount: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    remaining: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRequest: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    metadata: {
                                                        type: string;
                                                        nullable: boolean;
                                                        additionalProperties: boolean;
                                                        description: string;
                                                    };
                                                    permissions: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/get";
            };
            updateApiKey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        keyId: string;
                        userId?: unknown;
                        name?: string | undefined;
                        enabled?: boolean | undefined;
                        remaining?: number | undefined;
                        refillAmount?: number | undefined;
                        refillInterval?: number | undefined;
                        metadata?: any;
                        expiresIn?: number | null | undefined;
                        rateLimitEnabled?: boolean | undefined;
                        rateLimitTimeWindow?: number | undefined;
                        rateLimitMax?: number | undefined;
                        permissions?: Record<string, string[]> | null | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        permissions: {
                            [key: string]: string[];
                        } | null;
                        id: string;
                        name: string | null;
                        start: string | null;
                        prefix: string | null;
                        userId: string;
                        refillInterval: number | null;
                        refillAmount: number | null;
                        lastRefillAt: Date | null;
                        enabled: boolean;
                        rateLimitEnabled: boolean;
                        rateLimitTimeWindow: number | null;
                        rateLimitMax: number | null;
                        requestCount: number;
                        remaining: number | null;
                        lastRequest: Date | null;
                        expiresAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        metadata: Record<string, any> | null;
                    };
                } : {
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        keyId: import("better-auth").ZodString;
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                        name: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        enabled: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        remaining: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        refillAmount: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        refillInterval: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        metadata: import("better-auth").ZodOptional<import("better-auth").ZodAny>;
                        expiresIn: import("better-auth").ZodNullable<import("better-auth").ZodOptional<import("better-auth").ZodNumber>>;
                        rateLimitEnabled: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        rateLimitTimeWindow: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        rateLimitMax: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        permissions: import("better-auth").ZodNullable<import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    start: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    prefix: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    refillInterval: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    refillAmount: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRefillAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    enabled: {
                                                        type: string;
                                                        description: string;
                                                        default: boolean;
                                                    };
                                                    rateLimitEnabled: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    rateLimitTimeWindow: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitMax: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    requestCount: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    remaining: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRequest: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    metadata: {
                                                        type: string;
                                                        nullable: boolean;
                                                        additionalProperties: boolean;
                                                        description: string;
                                                    };
                                                    permissions: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/update";
            };
            deleteApiKey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        keyId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        keyId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            requestBody: {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                keyId: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/delete";
            };
            listApiKeys: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        permissions: {
                            [key: string]: string[];
                        } | null;
                        id: string;
                        name: string | null;
                        start: string | null;
                        prefix: string | null;
                        userId: string;
                        refillInterval: number | null;
                        refillAmount: number | null;
                        lastRefillAt: Date | null;
                        enabled: boolean;
                        rateLimitEnabled: boolean;
                        rateLimitTimeWindow: number | null;
                        rateLimitMax: number | null;
                        requestCount: number;
                        remaining: number | null;
                        lastRequest: Date | null;
                        expiresAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        metadata: Record<string, any> | null;
                    }[];
                } : {
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                }[]>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "array";
                                                items: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        start: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        prefix: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        refillInterval: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        refillAmount: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        lastRefillAt: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        enabled: {
                                                            type: string;
                                                            description: string;
                                                            default: boolean;
                                                        };
                                                        rateLimitEnabled: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        rateLimitTimeWindow: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        rateLimitMax: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        requestCount: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        remaining: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        lastRequest: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        expiresAt: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        metadata: {
                                                            type: string;
                                                            nullable: boolean;
                                                            additionalProperties: boolean;
                                                            description: string;
                                                        };
                                                        permissions: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/list";
            };
            deleteAllExpiredApiKeys: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                        error: unknown;
                    };
                } : {
                    success: boolean;
                    error: unknown;
                }>;
                options: {
                    method: "POST";
                    metadata: {
                        SERVER_ONLY: true;
                        client: boolean;
                    };
                } & {
                    use: any[];
                };
                path: "/api-key/delete-all-expired-api-keys";
            };
        };
        schema: {
            apikey: {
                fields: {
                    name: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    start: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    prefix: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    key: {
                        type: "string";
                        required: true;
                        input: false;
                    };
                    userId: {
                        type: "string";
                        references: {
                            model: string;
                            field: string;
                            onDelete: "cascade";
                        };
                        required: true;
                        input: false;
                    };
                    refillInterval: {
                        type: "number";
                        required: false;
                        input: false;
                    };
                    refillAmount: {
                        type: "number";
                        required: false;
                        input: false;
                    };
                    lastRefillAt: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                    enabled: {
                        type: "boolean";
                        required: false;
                        input: false;
                        defaultValue: true;
                    };
                    rateLimitEnabled: {
                        type: "boolean";
                        required: false;
                        input: false;
                        defaultValue: true;
                    };
                    rateLimitTimeWindow: {
                        type: "number";
                        required: false;
                        input: false;
                        defaultValue: number;
                    };
                    rateLimitMax: {
                        type: "number";
                        required: false;
                        input: false;
                        defaultValue: number;
                    };
                    requestCount: {
                        type: "number";
                        required: false;
                        input: false;
                        defaultValue: number;
                    };
                    remaining: {
                        type: "number";
                        required: false;
                        input: false;
                    };
                    lastRequest: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                    expiresAt: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                    createdAt: {
                        type: "date";
                        required: true;
                        input: false;
                    };
                    updatedAt: {
                        type: "date";
                        required: true;
                        input: false;
                    };
                    permissions: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    metadata: {
                        type: "string";
                        required: false;
                        input: true;
                        transform: {
                            input(value: packages_core_dist_db.DBPrimitive): string;
                            output(value: packages_core_dist_db.DBPrimitive): any;
                        };
                    };
                };
            };
        };
    } | {
        id: "multi-session";
        endpoints: {
            listDeviceSessions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: packages_core_dist_db.Session;
                        user: packages_core_dist_db.User;
                    }[];
                } : {
                    session: packages_core_dist_db.Session;
                    user: packages_core_dist_db.User;
                }[]>;
                options: {
                    method: "GET";
                    requireHeaders: true;
                } & {
                    use: any[];
                };
                path: "/multi-session/list-device-sessions";
            };
            setActiveSession: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        sessionToken: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: packages_core_dist_db.Session & Record<string, any>;
                        user: packages_core_dist_db.User & Record<string, any>;
                    };
                } : {
                    session: packages_core_dist_db.Session & Record<string, any>;
                    user: packages_core_dist_db.User & Record<string, any>;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        sessionToken: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/multi-session/set-active";
            };
            revokeDeviceSession: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        sessionToken: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        sessionToken: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/multi-session/revoke";
            };
        };
        hooks: {
            after: {
                matcher: (context: import("better-auth").HookEndpointContext) => boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>;
            }[];
        };
        $ERROR_CODES: {
            readonly INVALID_SESSION_TOKEN: "Invalid session token";
        };
    } | {
        id: "two-factor";
        endpoints: {
            enableTwoFactor: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                        issuer?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        totpURI: string;
                        backupCodes: string[];
                    };
                } : {
                    totpURI: string;
                    backupCodes: string[];
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                        issuer: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    totpURI: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    backupCodes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                        description: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/enable";
            };
            disableTwoFactor: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/disable";
            };
            verifyBackupCode: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        disableSession?: boolean | undefined;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string | undefined;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    };
                } : {
                    token: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        disableSession: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            image: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            twoFactorEnabled: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                    session: {
                                                        type: string;
                                                        properties: {
                                                            token: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            userId: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            expiresAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-backup-code";
            };
            generateBackupCodes: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                        backupCodes: string[];
                    };
                } : {
                    status: boolean;
                    backupCodes: string[];
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                        description: string;
                                                        enum: boolean[];
                                                    };
                                                    backupCodes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/generate-backup-codes";
            };
            viewBackupCodes: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                        backupCodes: string;
                    };
                } : {
                    status: boolean;
                    backupCodes: string;
                }>;
                options: {
                    method: "GET";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        SERVER_ONLY: true;
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/view-backup-codes";
            };
            sendTwoFactorOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: {
                        trustDevice?: boolean | undefined;
                    } | undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/send-otp";
            };
            verifyTwoFactorOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: any;
                            email: any;
                            emailVerified: any;
                            name: any;
                            image: any;
                            createdAt: any;
                            updatedAt: any;
                        };
                    };
                } : {
                    token: string;
                    user: {
                        id: any;
                        email: any;
                        emailVerified: any;
                        name: any;
                        image: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    token: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            image: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-otp";
            };
            generateTOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        secret: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        code: string;
                    };
                } : {
                    code: string;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        secret: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    code: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        SERVER_ONLY: true;
                    };
                } & {
                    use: any[];
                };
                path: "/totp/generate";
            };
            getTOTPURI: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        totpURI: string;
                    };
                } : {
                    totpURI: string;
                }>;
                options: {
                    method: "POST";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    totpURI: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/get-totp-uri";
            };
            verifyTOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    };
                } : {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-totp";
            };
        };
        options: import("better-auth/plugins").TwoFactorOptions | undefined;
        hooks: {
            after: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    twoFactorRedirect: boolean;
                } | undefined>;
            }[];
        };
        schema: {
            user: {
                fields: {
                    twoFactorEnabled: {
                        type: "boolean";
                        required: false;
                        defaultValue: false;
                        input: false;
                    };
                };
            };
            twoFactor: {
                fields: {
                    secret: {
                        type: "string";
                        required: true;
                        returned: false;
                    };
                    backupCodes: {
                        type: "string";
                        required: true;
                        returned: false;
                    };
                    userId: {
                        type: "string";
                        required: true;
                        returned: false;
                        references: {
                            model: string;
                            field: string;
                        };
                    };
                };
            };
        };
        rateLimit: {
            pathMatcher(path: string): boolean;
            window: number;
            max: number;
        }[];
        $ERROR_CODES: {
            readonly OTP_NOT_ENABLED: "OTP not enabled";
            readonly OTP_HAS_EXPIRED: "OTP has expired";
            readonly TOTP_NOT_ENABLED: "TOTP not enabled";
            readonly TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled";
            readonly BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled";
            readonly INVALID_BACKUP_CODE: "Invalid backup code";
            readonly INVALID_CODE: "Invalid code";
            readonly TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.";
            readonly INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie";
        };
    } | {
        id: "passkey";
        endpoints: {
            generatePasskeyRegistrationOptions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        authenticatorAttachment?: "platform" | "cross-platform" | undefined;
                        name?: string | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("@simplewebauthn/server").PublicKeyCredentialCreationOptionsJSON;
                } : import("@simplewebauthn/server").PublicKeyCredentialCreationOptionsJSON>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        authenticatorAttachment: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            platform: "platform";
                            "cross-platform": "cross-platform";
                        }>>;
                        name: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>>;
                    metadata: {
                        client: boolean;
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    parameters: {
                                        query: {
                                            authenticatorAttachment: {
                                                description: string;
                                                required: boolean;
                                            };
                                            name: {
                                                description: string;
                                                required: boolean;
                                            };
                                        };
                                    };
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    challenge: {
                                                        type: string;
                                                    };
                                                    rp: {
                                                        type: string;
                                                        properties: {
                                                            name: {
                                                                type: string;
                                                            };
                                                            id: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                            };
                                                            displayName: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    pubKeyCredParams: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                            properties: {
                                                                type: {
                                                                    type: string;
                                                                };
                                                                alg: {
                                                                    type: string;
                                                                };
                                                            };
                                                        };
                                                    };
                                                    timeout: {
                                                        type: string;
                                                    };
                                                    excludeCredentials: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                            properties: {
                                                                id: {
                                                                    type: string;
                                                                };
                                                                type: {
                                                                    type: string;
                                                                };
                                                                transports: {
                                                                    type: string;
                                                                    items: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    authenticatorSelection: {
                                                        type: string;
                                                        properties: {
                                                            authenticatorAttachment: {
                                                                type: string;
                                                            };
                                                            requireResidentKey: {
                                                                type: string;
                                                            };
                                                            userVerification: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    attestation: {
                                                        type: string;
                                                    };
                                                    extensions: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/generate-register-options";
            };
            generatePasskeyAuthenticationOptions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("@simplewebauthn/server").PublicKeyCredentialRequestOptionsJSON;
                } : import("@simplewebauthn/server").PublicKeyCredentialRequestOptionsJSON>;
                options: {
                    method: "POST";
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    challenge: {
                                                        type: string;
                                                    };
                                                    rp: {
                                                        type: string;
                                                        properties: {
                                                            name: {
                                                                type: string;
                                                            };
                                                            id: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                            };
                                                            displayName: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    timeout: {
                                                        type: string;
                                                    };
                                                    allowCredentials: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                            properties: {
                                                                id: {
                                                                    type: string;
                                                                };
                                                                type: {
                                                                    type: string;
                                                                };
                                                                transports: {
                                                                    type: string;
                                                                    items: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    userVerification: {
                                                        type: string;
                                                    };
                                                    authenticatorSelection: {
                                                        type: string;
                                                        properties: {
                                                            authenticatorAttachment: {
                                                                type: string;
                                                            };
                                                            requireResidentKey: {
                                                                type: string;
                                                            };
                                                            userVerification: {
                                                                type: string;
                                                            };
                                                        };
                                                    };
                                                    extensions: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/generate-authenticate-options";
            };
            verifyPasskeyRegistration: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        response: any;
                        name?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("better-auth/plugins/passkey").Passkey | null;
                } : import("better-auth/plugins/passkey").Passkey | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        response: import("better-auth").ZodAny;
                        name: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                400: {
                                    description: string;
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/verify-registration";
            };
            verifyPasskeyAuthentication: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        response: import("@simplewebauthn/server").AuthenticationResponseJSON;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                    };
                } : {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        response: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: {
                                response: import("@simplewebauthn/server").AuthenticationResponseJSON;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/verify-authentication";
            };
            listPasskeys: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("better-auth/plugins/passkey").Passkey[];
                } : import("better-auth/plugins/passkey").Passkey[]>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "array";
                                                items: {
                                                    $ref: string;
                                                    required: string[];
                                                };
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/list-user-passkeys";
            };
            deletePasskey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        id: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: null;
                } : null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/delete-passkey";
            };
            updatePasskey: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        id: string;
                        name: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        passkey: import("better-auth/plugins/passkey").Passkey;
                    };
                } : {
                    passkey: import("better-auth/plugins/passkey").Passkey;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                        name: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    passkey: {
                                                        $ref: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/passkey/update-passkey";
            };
        };
        schema: {
            passkey: {
                fields: {
                    name: {
                        type: "string";
                        required: false;
                    };
                    publicKey: {
                        type: "string";
                        required: true;
                    };
                    userId: {
                        type: "string";
                        references: {
                            model: string;
                            field: string;
                        };
                        required: true;
                    };
                    credentialID: {
                        type: "string";
                        required: true;
                    };
                    counter: {
                        type: "number";
                        required: true;
                    };
                    deviceType: {
                        type: "string";
                        required: true;
                    };
                    backedUp: {
                        type: "boolean";
                        required: true;
                    };
                    transports: {
                        type: "string";
                        required: false;
                    };
                    createdAt: {
                        type: "date";
                        required: false;
                    };
                    aaguid: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        $ERROR_CODES: {
            readonly CHALLENGE_NOT_FOUND: "Challenge not found";
            readonly YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY: "You are not allowed to register this passkey";
            readonly FAILED_TO_VERIFY_REGISTRATION: "Failed to verify registration";
            readonly PASSKEY_NOT_FOUND: "Passkey not found";
            readonly AUTHENTICATION_FAILED: "Authentication failed";
            readonly UNABLE_TO_CREATE_SESSION: "Unable to create session";
            readonly FAILED_TO_UPDATE_PASSKEY: "Failed to update passkey";
        };
    } | {
        id: "admin";
        init(): {
            options: {
                databaseHooks: {
                    user: {
                        create: {
                            before(user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            } & Record<string, unknown>): Promise<{
                                data: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                    role: string;
                                };
                            }>;
                        };
                    };
                    session: {
                        create: {
                            before(session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext | undefined): Promise<void>;
                        };
                    };
                };
            };
        };
        hooks: {
            after: {
                matcher(context: import("better-auth").HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
            }[];
        };
        endpoints: {
            setRole: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: string;
                        role: "user" | "admin" | ("user" | "admin")[];
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: import("better-auth/plugins").UserWithRole;
                    };
                } : {
                    user: import("better-auth/plugins").UserWithRole;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: {
                                userId: string;
                                role: "user" | "admin" | ("user" | "admin")[];
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/set-role";
            };
            getUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        id: string;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } : {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/get-user";
            };
            createUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        email: string;
                        password: string;
                        name: string;
                        role?: "user" | "admin" | ("user" | "admin")[] | undefined;
                        data?: Record<string, any>;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: import("better-auth/plugins").UserWithRole;
                    };
                } : {
                    user: import("better-auth/plugins").UserWithRole;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        email: import("better-auth").ZodString;
                        password: import("better-auth").ZodString;
                        name: import("better-auth").ZodString;
                        role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                        data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: {
                                email: string;
                                password: string;
                                name: string;
                                role?: "user" | "admin" | ("user" | "admin")[] | undefined;
                                data?: Record<string, any>;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/create-user";
            };
            adminUpdateUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                        data: Record<any, any>;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: import("better-auth/plugins").UserWithRole;
                } : import("better-auth/plugins").UserWithRole>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/update-user";
            };
            listUsers: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        searchValue?: string | undefined;
                        searchField?: "name" | "email" | undefined;
                        searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                        limit?: string | number | undefined;
                        offset?: string | number | undefined;
                        sortBy?: string | undefined;
                        sortDirection?: "asc" | "desc" | undefined;
                        filterField?: string | undefined;
                        filterValue?: string | number | boolean | undefined;
                        filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        users: import("better-auth/plugins").UserWithRole[];
                        total: number;
                        limit: number | undefined;
                        offset: number | undefined;
                    } | {
                        users: never[];
                        total: number;
                    };
                } : {
                    users: import("better-auth/plugins").UserWithRole[];
                    total: number;
                    limit: number | undefined;
                    offset: number | undefined;
                } | {
                    users: never[];
                    total: number;
                }>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    query: import("better-auth").ZodObject<{
                        searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            name: "name";
                            email: "email";
                        }>>;
                        searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            contains: "contains";
                            starts_with: "starts_with";
                            ends_with: "ends_with";
                        }>>;
                        limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            asc: "asc";
                            desc: "desc";
                        }>>;
                        filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                        filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            eq: "eq";
                            ne: "ne";
                            lt: "lt";
                            lte: "lte";
                            gt: "gt";
                            gte: "gte";
                            contains: "contains";
                        }>>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    users: {
                                                        type: string;
                                                        items: {
                                                            $ref: string;
                                                        };
                                                    };
                                                    total: {
                                                        type: string;
                                                    };
                                                    limit: {
                                                        type: string;
                                                    };
                                                    offset: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/list-users";
            };
            listUserSessions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                    };
                } : {
                    sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                }>;
                options: {
                    method: "POST";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    sessions: {
                                                        type: string;
                                                        items: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/list-user-sessions";
            };
            unbanUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: any;
                    };
                } : {
                    user: any;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/unban-user";
            };
            banUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                        banReason?: string | undefined;
                        banExpiresIn?: number | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: any;
                    };
                } : {
                    user: any;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/ban-user";
            };
            impersonateUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                } : {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/impersonate-user";
            };
            stopImpersonating: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        session: import("better-auth").Session & Record<string, any>;
                        user: packages_core_dist_db.User & Record<string, any>;
                    };
                } : {
                    session: import("better-auth").Session & Record<string, any>;
                    user: packages_core_dist_db.User & Record<string, any>;
                }>;
                options: {
                    method: "POST";
                    requireHeaders: true;
                } & {
                    use: any[];
                };
                path: "/admin/stop-impersonating";
            };
            revokeUserSession: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        sessionToken: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        sessionToken: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/revoke-user-session";
            };
            revokeUserSessions: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/revoke-user-sessions";
            };
            removeUser: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/remove-user";
            };
            setUserPassword: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        newPassword: string;
                        userId: unknown;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        newPassword: import("better-auth").ZodString;
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            user: import("better-auth/plugins").UserWithRole;
                            session: import("better-auth").Session;
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            operationId: string;
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/set-user-password";
            };
            userHasPermission: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: ({
                        permission: {
                            readonly user?: ("create" | "list" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                            readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                        };
                        permissions?: never;
                    } | {
                        permissions: {
                            readonly user?: ("create" | "list" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                            readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                        };
                        permission?: never;
                    }) & {
                        userId?: string;
                        role?: "user" | "admin" | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        error: null;
                        success: boolean;
                    };
                } : {
                    error: null;
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                        role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                        permissions: import("better-auth").ZodUndefined;
                    }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodUndefined;
                        permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    }, import("better-auth").$strip>]>>;
                    metadata: {
                        openapi: {
                            description: string;
                            requestBody: {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                permission: {
                                                    type: string;
                                                    description: string;
                                                    deprecated: boolean;
                                                };
                                                permissions: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    error: {
                                                        type: string;
                                                    };
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        $Infer: {
                            body: ({
                                permission: {
                                    readonly user?: ("create" | "list" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                                    readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                                };
                                permissions?: never;
                            } | {
                                permissions: {
                                    readonly user?: ("create" | "list" | "set-role" | "ban" | "impersonate" | "delete" | "set-password" | "get" | "update")[] | undefined;
                                    readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                                };
                                permission?: never;
                            }) & {
                                userId?: string;
                                role?: "user" | "admin" | undefined;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/admin/has-permission";
            };
        };
        $ERROR_CODES: {
            readonly FAILED_TO_CREATE_USER: "Failed to create user";
            readonly USER_ALREADY_EXISTS: "User already exists.";
            readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
            readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
            readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
            readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
            readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
            readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
            readonly BANNED_USER: "You have been banned from this application";
            readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
            readonly NO_DATA_TO_UPDATE: "No data to update";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
            readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
        };
        schema: {
            user: {
                fields: {
                    role: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banned: {
                        type: "boolean";
                        defaultValue: false;
                        required: false;
                        input: false;
                    };
                    banReason: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banExpires: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                };
            };
            session: {
                fields: {
                    impersonatedBy: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        options: any;
    } | {
        id: "open-api";
        endpoints: {
            generateOpenAPISchema: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        openapi: string;
                        info: {
                            title: string;
                            description: string;
                            version: string;
                        };
                        components: {
                            securitySchemes: {
                                apiKeyCookie: {
                                    type: string;
                                    in: string;
                                    name: string;
                                    description: string;
                                };
                                bearerAuth: {
                                    type: string;
                                    scheme: string;
                                    description: string;
                                };
                            };
                            schemas: {
                                [x: string]: {
                                    type: "object";
                                    properties: Record<string, {
                                        type: packages_core_dist_db.DBFieldType;
                                        default?: packages_core_dist_db.DBFieldAttributeConfig | "Generated at runtime";
                                        readOnly?: boolean;
                                    }>;
                                    required?: string[];
                                };
                            };
                        };
                        security: {
                            apiKeyCookie: never[];
                            bearerAuth: never[];
                        }[];
                        servers: {
                            url: string;
                        }[];
                        tags: {
                            name: string;
                            description: string;
                        }[];
                        paths: Record<string, import("better-auth/plugins").Path>;
                    };
                } : {
                    openapi: string;
                    info: {
                        title: string;
                        description: string;
                        version: string;
                    };
                    components: {
                        securitySchemes: {
                            apiKeyCookie: {
                                type: string;
                                in: string;
                                name: string;
                                description: string;
                            };
                            bearerAuth: {
                                type: string;
                                scheme: string;
                                description: string;
                            };
                        };
                        schemas: {
                            [x: string]: {
                                type: "object";
                                properties: Record<string, {
                                    type: packages_core_dist_db.DBFieldType;
                                    default?: packages_core_dist_db.DBFieldAttributeConfig | "Generated at runtime";
                                    readOnly?: boolean;
                                }>;
                                required?: string[];
                            };
                        };
                    };
                    security: {
                        apiKeyCookie: never[];
                        bearerAuth: never[];
                    }[];
                    servers: {
                        url: string;
                    }[];
                    tags: {
                        name: string;
                        description: string;
                    }[];
                    paths: Record<string, import("better-auth/plugins").Path>;
                }>;
                options: {
                    method: "GET";
                } & {
                    use: any[];
                };
                path: "/open-api/generate-schema";
            };
            openAPIReference: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: Response;
                } : Response>;
                options: {
                    method: "GET";
                    metadata: {
                        isAction: boolean;
                    };
                } & {
                    use: any[];
                };
                path: "/reference";
            };
        };
    })[];
}>;
export type AuthSession = typeof auth.$Infer.Session;
export declare const BetterAuthOpenAPI: {
    readonly getPaths: (prefix?: string) => Promise<any>;
    readonly components: Promise<any>;
};
