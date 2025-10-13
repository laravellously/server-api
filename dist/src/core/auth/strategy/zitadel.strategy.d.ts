import { ZitadelIntrospectionStrategy } from 'passport-zitadel';
import type { ZitadelAuthModuleConfig } from '../interfaces/config.interface';
import { ZitadelUser } from '../interfaces/user.interface';
declare const ZitadelStrategy_base: new (options: import("passport-zitadel").ZitadelIntrospectionOptions, verify?: import("passport-zitadel").VerifyFunction | undefined) => ZitadelIntrospectionStrategy & {
    validate(...args: any[]): unknown;
};
export declare class ZitadelStrategy extends ZitadelStrategy_base {
    constructor(options: ZitadelAuthModuleConfig);
    validate(payload: ZitadelUser): Promise<ZitadelUser>;
}
export {};
