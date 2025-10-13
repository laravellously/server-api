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
exports.ChartOfAccounts = void 0;
const core_1 = require("@mikro-orm/core");
const AccountTypes_1 = require("./AccountTypes");
const Organizations_1 = require("./Organizations");
let ChartOfAccounts = class ChartOfAccounts {
    [core_1.PrimaryKeyProp];
    accountId;
    org;
    accountCode;
    accountName;
    accountType;
    parent;
    currency = 'NGN';
    isControlAccount = false;
    isHeader = false;
    isActive = true;
    openingBalance;
    currentBalance;
    description;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.ChartOfAccounts = ChartOfAccounts;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "accountId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_coa_org', expression: 'CREATE INDEX idx_coa_org ON accounting.chart_of_accounts USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], ChartOfAccounts.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], ChartOfAccounts.prototype, "accountCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], ChartOfAccounts.prototype, "accountName", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_coa_account_type', expression: 'CREATE INDEX idx_coa_account_type ON accounting.chart_of_accounts USING btree (account_type_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => AccountTypes_1.AccountTypes, fieldName: 'account_type_id' }),
    __metadata("design:type", AccountTypes_1.AccountTypes)
], ChartOfAccounts.prototype, "accountType", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_coa_parent', expression: 'CREATE INDEX idx_coa_parent ON accounting.chart_of_accounts USING btree (parent_account_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => ChartOfAccounts, nullable: true }),
    __metadata("design:type", ChartOfAccounts)
], ChartOfAccounts.prototype, "parent", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean', comment: 'Control accounts (AR, AP, Inventory) link to sub-ledgers' }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "isControlAccount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "isHeader", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "openingBalance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "currentBalance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ChartOfAccounts.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ChartOfAccounts.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], ChartOfAccounts.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ChartOfAccounts.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ChartOfAccounts.prototype, "updatedBy", void 0);
exports.ChartOfAccounts = ChartOfAccounts = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Hierarchical chart of accounts per organization' }),
    (0, core_1.Index)({ name: 'idx_coa_active', expression: 'CREATE INDEX idx_coa_active ON accounting.chart_of_accounts USING btree (org_id, is_active) WHERE (deleted_at IS NULL)', properties: ['org', 'isActive'] }),
    (0, core_1.Unique)({ name: 'chart_of_accounts_org_id_account_code_key', properties: ['org', 'accountCode'] })
], ChartOfAccounts);
//# sourceMappingURL=ChartOfAccounts.js.map