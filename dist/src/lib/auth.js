"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const plugins_1 = require("better-auth/plugins");
const next_js_1 = require("better-auth/next-js");
const passkey_1 = require("better-auth/plugins/passkey");
const bun_1 = require("bun");
const pg_1 = require("pg");
const config = {
    appName: bun_1.env.APP_NAME,
    database: new pg_1.Pool({
        connectionString: bun_1.env.AUTH_DATABASE_URL
    }),
    trustedOrigins: ["*"],
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
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
        updateAge: 60 * 60 * 24,
    },
    advanced: {
        database: {
            generateId() {
                return (0, bun_1.randomUUIDv7)();
            },
        },
        cookiePrefix: bun_1.env.AUTH_COOKIE_PREFIX,
        crossSubDomainCookies: {
            enabled: true,
        },
        defaultCookieAttributes: {
            httpOnly: true,
            secure: true
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
        (0, next_js_1.nextCookies)()
    ],
};
exports.auth = (0, better_auth_1.betterAuth)(config);
//# sourceMappingURL=auth.js.map