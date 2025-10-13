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
exports.ArLedgerTransactionType = exports.ArLedger = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Organizations_1 = require("./Organizations");
let ArLedger = class ArLedger {
    [core_1.PrimaryKeyProp];
    arLedgerId;
    org;
    customer;
    invoiceId;
    paymentId;
    transactionDate;
    transactionType;
    referenceNumber;
    debitAmount;
    creditAmount;
    balance;
    currency = 'NGN';
    createdAt;
    createdBy;
};
exports.ArLedger = ArLedger;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ArLedger.prototype, "arLedgerId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], ArLedger.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id', deleteRule: 'cascade' }),
    __metadata("design:type", Customers_1.Customers)
], ArLedger.prototype, "customer", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_ar_ledger_invoice', expression: 'CREATE INDEX idx_ar_ledger_invoice ON accounting.ar_ledger USING btree (invoice_id) WHERE (invoice_id IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ArLedger.prototype, "invoiceId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_ar_ledger_payment', expression: 'CREATE INDEX idx_ar_ledger_payment ON accounting.ar_ledger USING btree (payment_id) WHERE (payment_id IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ArLedger.prototype, "paymentId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], ArLedger.prototype, "transactionDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ArLedgerTransactionType }),
    __metadata("design:type", String)
], ArLedger.prototype, "transactionType", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], ArLedger.prototype, "referenceNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ArLedger.prototype, "debitAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ArLedger.prototype, "creditAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], ArLedger.prototype, "balance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], ArLedger.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ArLedger.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ArLedger.prototype, "createdBy", void 0);
exports.ArLedger = ArLedger = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Accounts receivable sub-ledger tracking customer balances' }),
    (0, core_1.Index)({ name: 'idx_ar_ledger_org_customer', properties: ['org', 'customer', 'transactionDate'] })
], ArLedger);
var ArLedgerTransactionType;
(function (ArLedgerTransactionType) {
    ArLedgerTransactionType["INVOICE"] = "INVOICE";
    ArLedgerTransactionType["PAYMENT"] = "PAYMENT";
    ArLedgerTransactionType["CREDIT_NOTE"] = "CREDIT_NOTE";
    ArLedgerTransactionType["ADJUSTMENT"] = "ADJUSTMENT";
})(ArLedgerTransactionType || (exports.ArLedgerTransactionType = ArLedgerTransactionType = {}));
//# sourceMappingURL=ArLedger.js.map