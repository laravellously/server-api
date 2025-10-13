"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currencies = void 0;
const core_1 = require("@mikro-orm/core");
let Currencies = class Currencies {
    [core_1.PrimaryKeyProp];
    currencyCode;
    currencyName;
    symbol;
    decimalPlaces = 2;
    isActive = true;
    createdAt;
};
exports.Currencies = Currencies;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'character', length: 3 }),
    __metadata("design:type", String)
], Currencies.prototype, "currencyCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Currencies.prototype, "currencyName", void 0);
__decorate([
    (0, core_1.Property)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Currencies.prototype, "symbol", void 0);
__decorate([
    (0, core_1.Property)({ type: 'integer' }),
    __metadata("design:type", Object)
], Currencies.prototype, "decimalPlaces", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Currencies.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Currencies.prototype, "createdAt", void 0);
exports.Currencies = Currencies = __decorate([
    (0, core_1.Entity)({ schema: 'core' })
], Currencies);
//# sourceMappingURL=Currencies.js.map