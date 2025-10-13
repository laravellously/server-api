import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ZitadelIntrospectionStrategy } from 'passport-zitadel';
import { MODULE_OPTIONS_TOKEN } from '../auth.definition';
import type { ZitadelAuthModuleConfig } from '../interfaces/config.interface';
import { ZitadelUser } from '../interfaces/user.interface';

@Injectable()
export class ZitadelStrategy extends PassportStrategy(
  ZitadelIntrospectionStrategy,
  'zitadel',
) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    options: ZitadelAuthModuleConfig,
  ) {
    super(options);
  }
  // Required due to PassportStrategy's abstract declaration
  async validate(payload: ZitadelUser): Promise<ZitadelUser> {
    // Return the payload as-is since it already contains all the user information
    return payload;
  }
}