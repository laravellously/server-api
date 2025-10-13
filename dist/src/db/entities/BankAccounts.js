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
exports.BankAccounts = void 0;
const core_1 = require("@mikro-orm/core");
const ChartOfAccounts_1 = require("./ChartOfAccounts");
const Organizations_1 = require("./Organizations");
let BankAccounts = class BankAccounts {
    [core_1.PrimaryKeyProp];
    bankAccountId;
    org;
    account;
    bankName;
    accountNumber;
    accountHolder;
    currency = 'NGN';
    branch;
    swiftCode;
    iban;
    currentBalance;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.BankAccounts = BankAccounts;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "bankAccountId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_bank_accounts_org', expression: 'CREATE INDEX idx_bank_accounts_org ON accounting.bank_accounts USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], BankAccounts.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => ChartOfAccounts_1.ChartOfAccounts, fieldName: 'account_id', index: 'idx_bank_accounts_coa' }),
    __metadata("design:type", ChartOfAccounts_1.ChartOfAccounts)
], BankAccounts.prototype, "account", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], BankAccounts.prototype, "bankName", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], BankAccounts.prototype, "accountNumber", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], BankAccounts.prototype, "accountHolder", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], BankAccounts.prototype, "branch", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], BankAccounts.prototype, "swiftCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], BankAccounts.prototype, "iban", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "currentBalance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], BankAccounts.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], BankAccounts.prototype, "createdBy", void 0);
exports.BankAccounts = BankAccounts = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Bank accounts linked to chart of accounts for reconciliation' }),
    (0, core_1.Unique)({ name: 'bank_accounts_org_id_account_number_bank_name_key', properties: ['org', 'accountNumber', 'bankName'] })
], BankAccounts);
//# sourceMappingURL=BankAccounts.js.map