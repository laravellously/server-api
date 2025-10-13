import { betterAuth, type User } from "better-auth";
import {
  admin,
  apiKey,
  emailOTP,
  magicLink,
  multiSession,
  openAPI,
  // organization,
  twoFactor,
  username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { env, randomUUIDv7, redis } from "bun";
import { Pool } from "pg";

type VerificationType = "sign-in" | "email-verification" | "forget-password";

const config = {
	appName: env.APP_NAME,
	database: new Pool({
    connectionString: env.AUTH_DATABASE_URL
  }),
	trustedOrigins: env.TRUSTED_ORIGINS?.split(','),
	secret: env.AUTH_SECRET,
	baseURL: env.APP_URL,
	basePath: env.AUTH_PATH || "/auth",
	disabledPaths: ["/sign-in/social", "/link-social"],
	emailAndPassword: {
		enabled: true,
		disableSignUp: false,
		requireEmailVerification: false,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: false,
		sendResetPassword: async (
			data: { url: string; user: User },
			request?: Request,
		) => {
			console.log("reset password", data, request);
		},
	},
  hooks: {},
	// databaseHooks: {
	//   session: {
	//     create: {
	//       before: async (session: Session) => {
	//         // const organization = await getActiveOrganization(session.userId)
	//         return {
	//           data: {
	//             ...session,
	//             // activeOrganizationId: 1,
	//           },
	//         };
	//       },
	//     },
	//   },
	// },
  // session: {
  //   modelName: "sessions",
  // },
  // account: {
  //   modelName: "accounts",
  // },
  // verification: {
  //   modelName: "verifications",
  // },
	user: {
		// additionalFields: {
		// onboardingComplete: {
		// 	type: "boolean",
		// 	input: false,
		// },
		// phone: {
		// 	type: "string",
		// 	required: false,
		// },
		// },
    // modelName: "users",
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
				// Send change email verification
				console.log("change email", user, newEmail, url, token);
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url, token }) => {
				// Send delete account verification
				console.log("delete account", user, url, token);
			},
			beforeDelete: async (user) => {
				// Perform actions before user deletion
				console.log("before delete", user);
			},
			afterDelete: async (user) => {
				// Perform cleanup after user deletion
				console.log("after delete", user);
			},
		},
	},
	emailVerification: {
		sendOnSignUp: false,
		autoSignInAfterVerification: true,
		expiresIn: 3600,
		sendVerificationEmail: async (
			data: { url: string; user: User },
			request?: Request,
		) => {
			console.log("verify email", data, request);
		},
	},
  session: {
    // modelName: 'sessions',
    cookieName: 'bp-sess',
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieAttributes: {
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none'
    }
  },
	advanced: {
		database: {
			generateId() {
				return randomUUIDv7();
			},
		},
		cookiePrefix: env.AUTH_COOKIE_PREFIX,
    useSecureCookies: false,
    crossSubDomainCookies: {
      enabled: true,
      domain: "localhost",
    },
    defaultCookieAttributes: {
      httpOnly: true,
      secure: false,                  // dev over HTTP
      // sameSite: "none",               // must be "none" to allow cross-site
    },
    cookies: {
      session_token: {
        name: "bluu__session_token",
        attributes: {
          httpOnly: true,
          secure: false,
          // sameSite: "none",
        }
      }
      // you can override for other cookies if needed
    },
	},
	// Use Redis for storing sessions
	secondaryStorage: {
		get: async (key: string) => {
			return (await redis.get(key)) ?? null;
		},
		set: async (key: string, value: any, ttl?: number) => {
			await redis.set(key, value);
			if (ttl) await redis.expire(key, ttl);
		},
		delete: async (key: string) => {
			await redis.del(key);
		},
	},
	// rateLimit: { enabled: true },
	// onAPIError: {
	// 	throw: true,
	// 	onError: (error: any, ctx: any) => {
	// 		// Custom error handling
	// 		console.error("Auth error:", error, ctx);
	// 	},
	// 	errorURL: "/auth/error",
	// },
	telemetry: { enabled: false },
	plugins: [
		username(),
		magicLink({
			disableSignUp: true,
			async sendMagicLink(
				data: { email: string; url: string; token: string },
				request?: Request,
			) {
				console.log("magic link", data, request);
			},
		}),
		// emailOTP({
		// 	overrideDefaultEmailVerification: true,
		// 	sendVerificationOnSignUp: true,
		// 	expiresIn: 60 * 15,
		// 	async sendVerificationOTP(
		// 		data: { email: string; otp: string; type: VerificationType },
		// 		request?: Request,
		// 	) {
		// 		console.log("verify otp", data, request);
		// 	},
		// }),
		apiKey(),
		multiSession(),
		// organization({
		// 	async sendInvitationEmail(data) {
		// 		const inviteLink = `https://id.bluupay.co/accept-invitation/${data.id}`;
		// 		Object.assign(data, inviteLink);
		// 		console.log("send invitation", data);
		// 	},
		// 	async createOrganization() {
		// 		console.log("create org");
		// 	},
		// 	organizationCreation: {
		// 		disabled: false, // Set to true to disable organization creation
		// 		beforeCreate: async ({ organization, user }, request) => {
		// 			// Run custom logic before organization is created
		// 			// Optionally modify the organization data
		// 			console.log("before create org", request);
		// 			return {
		// 				data: {
		// 					...organization,
		// 					metadata: {
		// 						owner: user.email,
		// 					},
		// 				},
		// 			};
		// 		},
		// 		afterCreate: async ({ organization, member, user }, request) => {
		// 			// Run custom logic after organization is created
		// 			// e.g., create default resources, send notifications
		// 			// await setupDefaultResources(organization.id)
		// 			// TODO: migration
		// 			console.log("after create org", organization, member, user, request);
		// 		},
		// 	},
		// 	organizationDeletion: {
		// 		disabled: true, //to disable it altogether
		// 		beforeDelete: async (data, request) => {
		// 			// a callback to run before deleting org
		// 			console.log("before delete org", data, request);
		// 		},
		// 		afterDelete: async (data, request) => {
		// 			// a callback to run after deleting org
		// 			console.log("after delete org", data, request);
		// 		},
		// 	},
		// }),
		twoFactor(),
		passkey({
			rpName: "BluuPay",
		}),
		admin(),
		openAPI(),
	],
};

export const auth = betterAuth(config);

export type AuthSession = typeof auth.$Infer.Session;

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const BetterAuthOpenAPI = {
	getPaths: (prefix = "/auth") =>
		getSchema().then(({ paths }) => {
			const reference: typeof paths = Object.create(null);

			for (const path of Object.keys(paths)) {
				const key = prefix + path;
				reference[key] = paths[path];

				for (const method of Object.keys(paths[path])) {
					const operation = (reference[key] as any)[method];

					operation.tags = ["Better Auth"];
				}
			}

			return reference;
		}) as Promise<any>,
	components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;
