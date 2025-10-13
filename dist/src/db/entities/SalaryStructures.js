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
exports.SalaryStructuresPaymentFrequency = exports.SalaryStructures = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
const Organizations_1 = require("./Organizations");
let SalaryStructures = class SalaryStructures {
    [core_1.PrimaryKeyProp];
    salaryStructureId;
    org;
    employee;
    effectiveFrom;
    effectiveTo;
    basicSalary;
    housingAllowance;
    transportAllowance;
    mealAllowance;
    otherAllowances;
    grossSalary;
    currency = 'NGN';
    paymentFrequency = SalaryStructuresPaymentFrequency.MONTHLY;
    isActive = true;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.SalaryStructures = SalaryStructures;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "salaryStructureId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_salary_structures_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], SalaryStructures.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], SalaryStructures.prototype, "employee", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "effectiveFrom", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "effectiveTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2 }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "basicSalary", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "housingAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "transportAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "mealAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "otherAllowances", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, generated: '((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) stored', nullable: true }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "grossSalary", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "currency", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => SalaryStructuresPaymentFrequency }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "paymentFrequency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalaryStructures.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalaryStructures.prototype, "updatedBy", void 0);
exports.SalaryStructures = SalaryStructures = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee salary structures with allowances' }),
    (0, core_1.Index)({ name: 'idx_salary_structures_active', properties: ['org', 'isActive', 'effectiveFrom'] }),
    (0, core_1.Index)({ name: 'idx_salary_structures_employee', properties: ['employee', 'effectiveFrom'] })
], SalaryStructures);
var SalaryStructuresPaymentFrequency;
(function (SalaryStructuresPaymentFrequency) {
    SalaryStructuresPaymentFrequency["WEEKLY"] = "weekly";
    SalaryStructuresPaymentFrequency["BI-WEEKLY"] = "bi-weekly";
    SalaryStructuresPaymentFrequency["MONTHLY"] = "monthly";
    SalaryStructuresPaymentFrequency["ANNUAL"] = "annual";
})(SalaryStructuresPaymentFrequency || (exports.SalaryStructuresPaymentFrequency = SalaryStructuresPaymentFrequency = {}));
//# sourceMappingURL=SalaryStructures.js.map