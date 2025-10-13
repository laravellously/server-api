"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const sqlite_1 = __importDefault(require("@keyv/sqlite"));
const nestjs_1 = require("@mikro-orm/nestjs");
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const terminus_1 = require("@nestjs/terminus");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
const keyv_1 = require("keyv");
const mikro_orm_config_1 = __importDefault(require("../mikro-orm.config"));
const app_controller_1 = require("./app.controller");
const auth_1 = require("./lib/auth");
const core_module_1 = require("./module/core/core.module");
const users_module_1 = require("./module/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forRootAsync({
                useFactory: () => mikro_orm_config_1.default
            }),
            axios_1.HttpModule,
            terminus_1.TerminusModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
                cache: true,
                validate: (config) => {
                    return config;
                },
            }),
            cache_manager_1.CacheModule.register({
                ttl: 60 * 60,
                max: 1000,
                stores: new keyv_1.Keyv({
                    stats: true,
                    emitErrors: true,
                    namespace: 'app-cache',
                    store: new sqlite_1.default({
                        uri: 'sqlite://cache.sqlite',
                        busyTimeout: 10000,
                    }),
                }),
            }),
            nestjs_better_auth_1.AuthModule.forRoot({
                auth: auth_1.auth,
                isGlobal: true,
                disableBodyParser: true,
            }),
            core_module_1.CoreModule,
            users_module_1.UsersModule
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map