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
exports.PayrollEntriesPaymentStatus = exports.PayrollEntries = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
const Organizations_1 = require("./Organizations");
const PayrollPeriods_1 = require("./PayrollPeriods");
let PayrollEntries = class PayrollEntries {
    [core_1.PrimaryKeyProp];
    payrollEntryId;
    org;
    period;
    periodStartDate;
    employee;
    basicSalary;
    housingAllowance;
    transportAllowance;
    mealAllowance;
    otherAllowances;
    overtimePay;
    bonus;
    grossPay;
    payeDeduction;
    pensionEmployee;
    pensionEmployer;
    nhfDeduction;
    nhisDeduction;
    loanDeduction;
    otherDeductions;
    totalDeductions;
    netPay;
    paymentStatus = PayrollEntriesPaymentStatus.PENDING;
    paidAt;
    paymentReference;
    notes;
    createdAt;
    updatedAt;
    createdBy;
};
exports.PayrollEntries = PayrollEntries;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], PayrollEntries.prototype, "payrollEntryId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true }),
    __metadata("design:type", Organizations_1.Organizations)
], PayrollEntries.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => PayrollPeriods_1.PayrollPeriods, fieldName: 'period_id', deleteRule: 'cascade', index: 'idx_payroll_entries_period' }),
    __metadata("design:type", PayrollPeriods_1.PayrollPeriods)
], PayrollEntries.prototype, "period", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'date' }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "periodStartDate", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], PayrollEntries.prototype, "employee", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2 }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "basicSalary", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "housingAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "transportAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "mealAllowance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "otherAllowances", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "overtimePay", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "bonus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, generated: '((((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) + overtime_pay) + bonus) stored', nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "grossPay", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "payeDeduction", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "pensionEmployee", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "pensionEmployer", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "nhfDeduction", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "nhisDeduction", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "loanDeduction", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "otherDeductions", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, generated: '(((((paye_deduction + pension_employee) + nhf_deduction) + nhis_deduction) + loan_deduction) + other_deductions) stored', nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "totalDeductions", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, generated: '(((((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) + overtime_pay) + bonus) - (((((paye_deduction + pension_employee) + nhf_deduction) + nhis_deduction) + loan_deduction) + other_deductions)) stored', nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "netPay", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PayrollEntriesPaymentStatus }),
    __metadata("design:type", Object)
], PayrollEntries.prototype, "paymentStatus", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], PayrollEntries.prototype, "paidAt", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "paymentReference", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PayrollEntries.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PayrollEntries.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PayrollEntries.prototype, "createdBy", void 0);
exports.PayrollEntries = PayrollEntries = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee payroll with Nigerian statutory deductions (PAYE, Pension, NHF), partitioned by period' }),
    (0, core_1.Index)({ name: 'idx_payroll_entries_employee', properties: ['employee', 'periodStartDate'] }),
    (0, core_1.Index)({ name: 'idx_payroll_entries_status', properties: ['org', 'paymentStatus'] })
], PayrollEntries);
var PayrollEntriesPaymentStatus;
(function (PayrollEntriesPaymentStatus) {
    PayrollEntriesPaymentStatus["PENDING"] = "pending";
    PayrollEntriesPaymentStatus["PAID"] = "paid";
    PayrollEntriesPaymentStatus["FAILED"] = "failed";
})(PayrollEntriesPaymentStatus || (exports.PayrollEntriesPaymentStatus = PayrollEntriesPaymentStatus = {}));
//# sourceMappingURL=PayrollEntries.js.map