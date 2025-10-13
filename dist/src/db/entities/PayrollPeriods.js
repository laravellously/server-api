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
exports.PayrollPeriodsStatus = exports.PayrollPeriods = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let PayrollPeriods = class PayrollPeriods {
    [core_1.PrimaryKeyProp];
    periodId;
    org;
    periodCode;
    periodName;
    startDate;
    endDate;
    paymentDate;
    status = PayrollPeriodsStatus.DRAFT;
    totalGross;
    totalDeductions;
    totalNet;
    processedAt;
    processedBy;
    approvedAt;
    approvedBy;
    createdAt;
    updatedAt;
    createdBy;
};
exports.PayrollPeriods = PayrollPeriods;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], PayrollPeriods.prototype, "periodId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], PayrollPeriods.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "periodCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "periodName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "endDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "paymentDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PayrollPeriodsStatus }),
    __metadata("design:type", Object)
], PayrollPeriods.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "totalGross", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "totalDeductions", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "totalNet", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], PayrollPeriods.prototype, "processedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "processedBy", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], PayrollPeriods.prototype, "approvedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "approvedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PayrollPeriods.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PayrollPeriods.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PayrollPeriods.prototype, "createdBy", void 0);
exports.PayrollPeriods = PayrollPeriods = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Payroll processing periods' }),
    (0, core_1.Index)({ name: 'idx_payroll_periods_org', properties: ['org', 'startDate'] }),
    (0, core_1.Index)({ name: 'idx_payroll_periods_status', properties: ['org', 'status'] }),
    (0, core_1.Unique)({ name: 'payroll_periods_org_id_period_code_key', properties: ['org', 'periodCode'] })
], PayrollPeriods);
var PayrollPeriodsStatus;
(function (PayrollPeriodsStatus) {
    PayrollPeriodsStatus["DRAFT"] = "draft";
    PayrollPeriodsStatus["PROCESSING"] = "processing";
    PayrollPeriodsStatus["APPROVED"] = "approved";
    PayrollPeriodsStatus["PAID"] = "paid";
    PayrollPeriodsStatus["CLOSED"] = "closed";
})(PayrollPeriodsStatus || (exports.PayrollPeriodsStatus = PayrollPeriodsStatus = {}));
//# sourceMappingURL=PayrollPeriods.js.map