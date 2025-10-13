"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetterAuthOpenAPI = exports.auth = void 0;
const better_auth_1 = require("better-auth");
const plugins_1 = require("better-auth/plugins");
const passkey_1 = require("better-auth/plugins/passkey");
const bun_1 = require("bun");
const pg_1 = require("pg");
const config = {
    appName: bun_1.env.APP_NAME,
    database: new pg_1.Pool({
        connectionString: bun_1.env.AUTH_DATABASE_URL
    }),
    trustedOrigins: bun_1.env.TRUSTED_ORIGINS?.split(','),
    secret: bun_1.env.AUTH_SECRET,
    baseURL: bun_1.env.APP_URL,
    basePath: bun_1.env.AUTH_PATH || "/auth",
    disabledPaths: ["/sign-in/social", "/link-social"],
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: false,
        sendResetPassword: async (data, request) => {
            console.log("reset password", data, request);
        },
    },
    hooks: {},
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
                console.log("change email", user, newEmail, url, token);
            },
        },
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url, token }) => {
                console.log("delete account", user, url, token);
            },
            beforeDelete: async (user) => {
                console.log("before delete", user);
            },
            afterDelete: async (user) => {
                console.log("after delete", user);
            },
        },
    },
    emailVerification: {
        sendOnSignUp: false,
        autoSignInAfterVerification: true,
        expiresIn: 3600,
        sendVerificationEmail: async (data, request) => {
            console.log("verify email", data, request);
        },
    },
    session: {
        cookieName: 'bp-sess',
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
        maxAge: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieAttributes: {
            secure: bun_1.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'none'
        }
    },
    advanced: {
        database: {
            generateId() {
                return (0, bun_1.randomUUIDv7)();
            },
        },
        cookiePrefix: bun_1.env.AUTH_COOKIE_PREFIX,
        useSecureCookies: false,
        crossSubDomainCookies: {
            enabled: true,
            domain: "localhost",
        },
        defaultCookieAttributes: {
            httpOnly: true,
            secure: false,
        },
        cookies: {
            session_token: {
                name: "bluu__session_token",
                attributes: {
                    httpOnly: true,
                    secure: false,
                }
            }
        },
    },
    secondaryStorage: {
        get: async (key) => {
            return (await bun_1.redis.get(key)) ?? null;
        },
        set: async (key, value, ttl) => {
            await bun_1.redis.set(key, value);
            if (ttl)
                await bun_1.redis.expire(key, ttl);
        },
        delete: async (key) => {
            await bun_1.redis.del(key);
        },
    },
    telemetry: { enabled: false },
    plugins: [
        (0, plugins_1.username)(),
        (0, plugins_1.magicLink)({
            disableSignUp: true,
            async sendMagicLink(data, request) {
                console.log("magic link", data, request);
            },
        }),
        (0, plugins_1.apiKey)(),
        (0, plugins_1.multiSession)(),
        (0, plugins_1.twoFactor)(),
        (0, passkey_1.passkey)({
            rpName: "BluuPay",
        }),
        (0, plugins_1.admin)(),
        (0, plugins_1.openAPI)(),
    ],
};
exports.auth = (0, better_auth_1.betterAuth)(config);
let _schema;
const getSchema = async () => (_schema ??= exports.auth.api.generateOpenAPISchema());
exports.BetterAuthOpenAPI = {
    getPaths: (prefix = "/auth") => getSchema().then(({ paths }) => {
        const reference = Object.create(null);
        for (const path of Object.keys(paths)) {
            const key = prefix + path;
            reference[key] = paths[path];
            for (const method of Object.keys(paths[path])) {
                const operation = reference[key][method];
                operation.tags = ["Better Auth"];
            }
        }
        return reference;
    }),
    components: getSchema().then(({ components }) => components),
};
//# sourceMappingURL=auth.js.map