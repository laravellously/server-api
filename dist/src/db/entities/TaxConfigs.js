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
exports.TaxConfigsTaxType = exports.TaxConfigs = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let TaxConfigs = class TaxConfigs {
    [core_1.PrimaryKeyProp];
    taxConfigId;
    org;
    taxType;
    taxName;
    taxRate;
    isInclusive = false;
    appliesTo;
    effectiveFrom;
    effectiveTo;
    isActive = true;
    createdAt;
    updatedAt;
    createdBy;
};
exports.TaxConfigs = TaxConfigs;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], TaxConfigs.prototype, "taxConfigId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], TaxConfigs.prototype, "org", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => TaxConfigsTaxType }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "taxType", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "taxName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "taxRate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], TaxConfigs.prototype, "isInclusive", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "appliesTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "effectiveFrom", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "effectiveTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], TaxConfigs.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], TaxConfigs.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], TaxConfigs.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TaxConfigs.prototype, "createdBy", void 0);
exports.TaxConfigs = TaxConfigs = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'Organization-specific tax configurations (VAT, WHT, etc.)' }),
    (0, core_1.Index)({ name: 'idx_tax_configs_org', properties: ['org', 'isActive'] })
], TaxConfigs);
var TaxConfigsTaxType;
(function (TaxConfigsTaxType) {
    TaxConfigsTaxType["VAT"] = "VAT";
    TaxConfigsTaxType["WHT"] = "WHT";
    TaxConfigsTaxType["EXCISE"] = "EXCISE";
    TaxConfigsTaxType["IMPORT_DUTY"] = "IMPORT_DUTY";
    TaxConfigsTaxType["OTHER"] = "OTHER";
})(TaxConfigsTaxType || (exports.TaxConfigsTaxType = TaxConfigsTaxType = {}));
//# sourceMappingURL=TaxConfigs.js.map