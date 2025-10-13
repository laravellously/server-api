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
exports.ExchangeRates = void 0;
const core_1 = require("@mikro-orm/core");
const Currencies_1 = require("./Currencies");
const Organizations_1 = require("./Organizations");
let ExchangeRates = class ExchangeRates {
    [core_1.PrimaryKeyProp];
    exchangeRateId;
    org;
    fromCurrency;
    toCurrency;
    rate;
    effectiveDate;
    createdAt;
    createdBy;
};
exports.ExchangeRates = ExchangeRates;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ExchangeRates.prototype, "exchangeRateId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], ExchangeRates.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Currencies_1.Currencies, fieldName: 'from_currency' }),
    __metadata("design:type", Currencies_1.Currencies)
], ExchangeRates.prototype, "fromCurrency", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Currencies_1.Currencies, fieldName: 'to_currency' }),
    __metadata("design:type", Currencies_1.Currencies)
], ExchangeRates.prototype, "toCurrency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6 }),
    __metadata("design:type", String)
], ExchangeRates.prototype, "rate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], ExchangeRates.prototype, "effectiveDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ExchangeRates.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ExchangeRates.prototype, "createdBy", void 0);
exports.ExchangeRates = ExchangeRates = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'Historical exchange rates for multi-currency transactions' }),
    (0, core_1.Index)({ name: 'idx_exchange_rates_currencies', properties: ['fromCurrency', 'toCurrency', 'effectiveDate'] }),
    (0, core_1.Index)({ name: 'idx_exchange_rates_org', properties: ['org', 'effectiveDate'] }),
    (0, core_1.Unique)({ name: 'exchange_rates_org_id_from_currency_to_currency_effective_d_key', properties: ['org', 'fromCurrency', 'toCurrency', 'effectiveDate'] })
], ExchangeRates);
//# sourceMappingURL=ExchangeRates.js.map