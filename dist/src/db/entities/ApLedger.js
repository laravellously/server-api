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
exports.ApLedgerTransactionType = exports.ApLedger = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
const Suppliers_1 = require("./Suppliers");
let ApLedger = class ApLedger {
    [core_1.PrimaryKeyProp];
    apLedgerId;
    org;
    supplier;
    billId;
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
exports.ApLedger = ApLedger;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ApLedger.prototype, "apLedgerId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], ApLedger.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Suppliers_1.Suppliers, fieldName: 'supplier_id', deleteRule: 'cascade' }),
    __metadata("design:type", Suppliers_1.Suppliers)
], ApLedger.prototype, "supplier", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_ap_ledger_bill', expression: 'CREATE INDEX idx_ap_ledger_bill ON accounting.ap_ledger USING btree (bill_id) WHERE (bill_id IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApLedger.prototype, "billId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApLedger.prototype, "paymentId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], ApLedger.prototype, "transactionDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ApLedgerTransactionType }),
    __metadata("design:type", String)
], ApLedger.prototype, "transactionType", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], ApLedger.prototype, "referenceNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ApLedger.prototype, "debitAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], ApLedger.prototype, "creditAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], ApLedger.prototype, "balance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], ApLedger.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ApLedger.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ApLedger.prototype, "createdBy", void 0);
exports.ApLedger = ApLedger = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Accounts payable sub-ledger tracking supplier balances' }),
    (0, core_1.Index)({ name: 'idx_ap_ledger_org_supplier', properties: ['org', 'supplier', 'transactionDate'] })
], ApLedger);
var ApLedgerTransactionType;
(function (ApLedgerTransactionType) {
    ApLedgerTransactionType["BILL"] = "BILL";
    ApLedgerTransactionType["PAYMENT"] = "PAYMENT";
    ApLedgerTransactionType["DEBIT_NOTE"] = "DEBIT_NOTE";
    ApLedgerTransactionType["ADJUSTMENT"] = "ADJUSTMENT";
})(ApLedgerTransactionType || (exports.ApLedgerTransactionType = ApLedgerTransactionType = {}));
//# sourceMappingURL=ApLedger.js.map