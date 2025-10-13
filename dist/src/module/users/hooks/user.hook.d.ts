import { type AuthHookContext } from "@thallesp/nestjs-better-auth";
export declare class UserHook {
    handleAfterLoginHook(ctx: AuthHookContext): Promise<void>;
}
