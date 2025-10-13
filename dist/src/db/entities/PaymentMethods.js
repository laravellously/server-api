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
exports.PaymentMethodsMethodType = exports.PaymentMethods = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let PaymentMethods = class PaymentMethods {
    [core_1.PrimaryKeyProp];
    paymentMethodId;
    org;
    methodCode;
    methodName;
    methodType;
    isActive = true;
    createdAt;
};
exports.PaymentMethods = PaymentMethods;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], PaymentMethods.prototype, "paymentMethodId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_payment_methods_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], PaymentMethods.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], PaymentMethods.prototype, "methodCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], PaymentMethods.prototype, "methodName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PaymentMethodsMethodType }),
    __metadata("design:type", String)
], PaymentMethods.prototype, "methodType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], PaymentMethods.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PaymentMethods.prototype, "createdAt", void 0);
exports.PaymentMethods = PaymentMethods = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Payment methods including mobile money (popular in Nigeria)' }),
    (0, core_1.Unique)({ name: 'payment_methods_org_id_method_code_key', properties: ['org', 'methodCode'] })
], PaymentMethods);
var PaymentMethodsMethodType;
(function (PaymentMethodsMethodType) {
    PaymentMethodsMethodType["CASH"] = "CASH";
    PaymentMethodsMethodType["CARD"] = "CARD";
    PaymentMethodsMethodType["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethodsMethodType["MOBILE_MONEY"] = "MOBILE_MONEY";
    PaymentMethodsMethodType["CHEQUE"] = "CHEQUE";
    PaymentMethodsMethodType["CREDIT"] = "CREDIT";
    PaymentMethodsMethodType["OTHER"] = "OTHER";
})(PaymentMethodsMethodType || (exports.PaymentMethodsMethodType = PaymentMethodsMethodType = {}));
//# sourceMappingURL=PaymentMethods.js.map