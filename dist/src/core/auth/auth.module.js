"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZitadelAuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_definition_1 = require("./auth.definition");
const zitadel_strategy_1 = require("./strategy/zitadel.strategy");
let ZitadelAuthModule = class ZitadelAuthModule extends auth_definition_1.ConfigurableModuleClass {
};
exports.ZitadelAuthModule = ZitadelAuthModule;
exports.ZitadelAuthModule = ZitadelAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule],
        providers: [
            {
                provide: auth_definition_1.MODULE_OPTIONS_TOKEN,
                useValue: auth_definition_1.MODULE_OPTIONS_TOKEN,
            },
            zitadel_strategy_1.ZitadelStrategy,
        ],
        exports: [zitadel_strategy_1.ZitadelStrategy],
    })
], ZitadelAuthModule);
//# sourceMappingURL=auth.module.js.map