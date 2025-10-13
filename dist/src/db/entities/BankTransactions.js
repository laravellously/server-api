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
exports.BankTransactions = void 0;
const core_1 = require("@mikro-orm/core");
const BankAccounts_1 = require("./BankAccounts");
let BankTransactions = class BankTransactions {
    [core_1.PrimaryKeyProp];
    bankTransactionId;
    bankAccount;
    transactionDate;
    valueDate;
    description;
    reference;
    debitAmount;
    creditAmount;
    balance;
    isReconciled = false;
    reconciledEntryId;
    reconciledAt;
    reconciledBy;
    createdAt;
};
exports.BankTransactions = BankTransactions;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], BankTransactions.prototype, "bankTransactionId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => BankAccounts_1.BankAccounts, fieldName: 'bank_account_id', deleteRule: 'cascade' }),
    __metadata("design:type", BankAccounts_1.BankAccounts)
], BankTransactions.prototype, "bankAccount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], BankTransactions.prototype, "transactionDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "valueDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "reference", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "debitAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "creditAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "balance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], BankTransactions.prototype, "isReconciled", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "reconciledEntryId", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], BankTransactions.prototype, "reconciledAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], BankTransactions.prototype, "reconciledBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], BankTransactions.prototype, "createdAt", void 0);
exports.BankTransactions = BankTransactions = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Bank statement transactions for reconciliation' }),
    (0, core_1.Index)({ name: 'idx_bank_transactions_account', properties: ['bankAccount', 'transactionDate'] }),
    (0, core_1.Index)({ name: 'idx_bank_transactions_reconciled', properties: ['bankAccount', 'isReconciled'] })
], BankTransactions);
//# sourceMappingURL=BankTransactions.js.map