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
exports.StatutoryDeductionConfigsAppliesTo = exports.StatutoryDeductionConfigsCalculationMethod = exports.StatutoryDeductionConfigsDeductionType = exports.StatutoryDeductionConfigs = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let StatutoryDeductionConfigs = class StatutoryDeductionConfigs {
    [core_1.PrimaryKeyProp];
    configId;
    org;
    deductionType;
    deductionName;
    calculationMethod;
    employeePercentage;
    employerPercentage;
    fixedAmount;
    appliesTo;
    minThreshold;
    maxThreshold;
    effectiveFrom;
    effectiveTo;
    isActive = true;
    configDetails;
    createdAt;
    updatedAt;
    createdBy;
};
exports.StatutoryDeductionConfigs = StatutoryDeductionConfigs;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], StatutoryDeductionConfigs.prototype, "configId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], StatutoryDeductionConfigs.prototype, "org", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => StatutoryDeductionConfigsDeductionType }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "deductionType", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "deductionName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => StatutoryDeductionConfigsCalculationMethod }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "calculationMethod", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "employeePercentage", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "employerPercentage", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "fixedAmount", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => StatutoryDeductionConfigsAppliesTo, nullable: true }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "appliesTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "minThreshold", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "maxThreshold", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "effectiveFrom", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "effectiveTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], StatutoryDeductionConfigs.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json', nullable: true, comment: 'JSON configuration for tiered calculations like PAYE tax bands' }),
    __metadata("design:type", Object)
], StatutoryDeductionConfigs.prototype, "configDetails", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], StatutoryDeductionConfigs.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], StatutoryDeductionConfigs.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], StatutoryDeductionConfigs.prototype, "createdBy", void 0);
exports.StatutoryDeductionConfigs = StatutoryDeductionConfigs = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Nigerian statutory deductions: PAYE, Pension (18%), NHF (2.5%), etc.' }),
    (0, core_1.Index)({ name: 'idx_statutory_deduction_configs_effective', properties: ['org', 'effectiveFrom'] }),
    (0, core_1.Index)({ name: 'idx_statutory_deduction_configs_org', properties: ['org', 'isActive'] }),
    (0, core_1.Unique)({ name: 'statutory_deduction_configs_org_id_deduction_type_effective_key', properties: ['org', 'deductionType', 'effectiveFrom'] })
], StatutoryDeductionConfigs);
var StatutoryDeductionConfigsDeductionType;
(function (StatutoryDeductionConfigsDeductionType) {
    StatutoryDeductionConfigsDeductionType["PAYE"] = "PAYE";
    StatutoryDeductionConfigsDeductionType["PENSION"] = "PENSION";
    StatutoryDeductionConfigsDeductionType["NHF"] = "NHF";
    StatutoryDeductionConfigsDeductionType["NHIS"] = "NHIS";
    StatutoryDeductionConfigsDeductionType["ITF"] = "ITF";
    StatutoryDeductionConfigsDeductionType["NSITF"] = "NSITF";
    StatutoryDeductionConfigsDeductionType["OTHER"] = "OTHER";
})(StatutoryDeductionConfigsDeductionType || (exports.StatutoryDeductionConfigsDeductionType = StatutoryDeductionConfigsDeductionType = {}));
var StatutoryDeductionConfigsCalculationMethod;
(function (StatutoryDeductionConfigsCalculationMethod) {
    StatutoryDeductionConfigsCalculationMethod["PERCENTAGE"] = "PERCENTAGE";
    StatutoryDeductionConfigsCalculationMethod["FIXED"] = "FIXED";
    StatutoryDeductionConfigsCalculationMethod["TIERED"] = "TIERED";
})(StatutoryDeductionConfigsCalculationMethod || (exports.StatutoryDeductionConfigsCalculationMethod = StatutoryDeductionConfigsCalculationMethod = {}));
var StatutoryDeductionConfigsAppliesTo;
(function (StatutoryDeductionConfigsAppliesTo) {
    StatutoryDeductionConfigsAppliesTo["BASIC"] = "BASIC";
    StatutoryDeductionConfigsAppliesTo["GROSS"] = "GROSS";
    StatutoryDeductionConfigsAppliesTo["TOTAL"] = "TOTAL";
})(StatutoryDeductionConfigsAppliesTo || (exports.StatutoryDeductionConfigsAppliesTo = StatutoryDeductionConfigsAppliesTo = {}));
//# sourceMappingURL=StatutoryDeductionConfigs.js.map