import { Injectable } from "@nestjs/common";
import {
  AfterHook,
  type AuthHookContext,
  Hook
} from "@thallesp/nestjs-better-auth";
import { TemporalService } from "nestjs-temporal-core";

@Hook()
@Injectable()
export class UserHook {
  // constructor(private readonly temporal: TemporalService) {}
  @AfterHook('/sign-in/email')
  async handleAfterLoginHook(ctx: AuthHookContext) {
    // check for onboarding
    // send email if user enabled notification
    console.debug(ctx.context.session?.user.email)
  }

}