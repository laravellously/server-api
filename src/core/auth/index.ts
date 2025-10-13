// entrypoint - export your stuff here
export * from './auth.module';

// export token which is used to inject AuthModule config
export { MODULE_OPTIONS_TOKEN as AUTH_OPTIONS_TOKEN } from './auth.definition';

// export backend-facing interfaces
export type { ZitadelUser } from './interfaces/user.interface';
export type { ZitadelAuthModuleConfig } from './interfaces/config.interface';