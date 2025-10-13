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
exports.EmployeeBankAccounts = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
let EmployeeBankAccounts = class EmployeeBankAccounts {
    [core_1.PrimaryKeyProp];
    empBankAccountId;
    employee;
    bankName;
    accountNumber;
    accountName;
    bankCode;
    isPrimary = false;
    createdAt;
    updatedAt;
    createdBy;
};
exports.EmployeeBankAccounts = EmployeeBankAccounts;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], EmployeeBankAccounts.prototype, "empBankAccountId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade', index: 'idx_emp_bank_accounts_employee' }),
    __metadata("design:type", Employees_1.Employees)
], EmployeeBankAccounts.prototype, "employee", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], EmployeeBankAccounts.prototype, "bankName", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], EmployeeBankAccounts.prototype, "accountNumber", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], EmployeeBankAccounts.prototype, "accountName", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], EmployeeBankAccounts.prototype, "bankCode", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], EmployeeBankAccounts.prototype, "isPrimary", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], EmployeeBankAccounts.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], EmployeeBankAccounts.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeBankAccounts.prototype, "createdBy", void 0);
exports.EmployeeBankAccounts = EmployeeBankAccounts = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee bank accounts for salary payments' })
], EmployeeBankAccounts);
//# sourceMappingURL=EmployeeBankAccounts.js.map