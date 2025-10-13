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
exports.JournalEntriesStatus = exports.JournalEntriesEntryType = exports.JournalEntries = void 0;
const core_1 = require("@mikro-orm/core");
const FiscalPeriods_1 = require("./FiscalPeriods");
const JournalBatches_1 = require("./JournalBatches");
const Organizations_1 = require("./Organizations");
let JournalEntries = class JournalEntries {
    [core_1.PrimaryKeyProp];
    entryId;
    org;
    entryNumber;
    entryDate;
    postingDate;
    batch;
    period;
    entryType;
    referenceType;
    referenceId;
    description;
    currency = 'NGN';
    exchangeRate;
    status = JournalEntriesStatus.DRAFT;
    postedAt;
    postedBy;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.JournalEntries = JournalEntries;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "entryId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true }),
    __metadata("design:type", Organizations_1.Organizations)
], JournalEntries.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], JournalEntries.prototype, "entryNumber", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "entryDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], JournalEntries.prototype, "postingDate", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_journal_entries_batch', expression: 'CREATE INDEX idx_journal_entries_batch ON ONLY accounting.journal_entries USING btree (batch_id) WHERE (batch_id IS NOT NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => JournalBatches_1.JournalBatches, fieldName: 'batch_id', deleteRule: 'set null', nullable: true }),
    __metadata("design:type", JournalBatches_1.JournalBatches)
], JournalEntries.prototype, "batch", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => FiscalPeriods_1.FiscalPeriods, fieldName: 'period_id', index: 'idx_journal_entries_period' }),
    __metadata("design:type", FiscalPeriods_1.FiscalPeriods)
], JournalEntries.prototype, "period", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => JournalEntriesEntryType }),
    __metadata("design:type", String)
], JournalEntries.prototype, "entryType", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], JournalEntries.prototype, "referenceType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], JournalEntries.prototype, "referenceId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], JournalEntries.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` }),
    __metadata("design:type", String)
], JournalEntries.prototype, "exchangeRate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => JournalEntriesStatus }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], JournalEntries.prototype, "postedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], JournalEntries.prototype, "postedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], JournalEntries.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], JournalEntries.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], JournalEntries.prototype, "updatedBy", void 0);
exports.JournalEntries = JournalEntries = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Journal entries (headers) partitioned by date for scalability' }),
    (0, core_1.Index)({ name: 'idx_journal_entries_entry_number', properties: ['org', 'entryNumber'] }),
    (0, core_1.Index)({ name: 'idx_journal_entries_posting_date', properties: ['org', 'postingDate'] }),
    (0, core_1.Index)({ name: 'idx_journal_entries_reference', properties: ['referenceType', 'referenceId'] }),
    (0, core_1.Index)({ name: 'idx_journal_entries_status', properties: ['org', 'status', 'entryDate'] })
], JournalEntries);
var JournalEntriesEntryType;
(function (JournalEntriesEntryType) {
    JournalEntriesEntryType["MANUAL"] = "MANUAL";
    JournalEntriesEntryType["SALES"] = "SALES";
    JournalEntriesEntryType["PURCHASE"] = "PURCHASE";
    JournalEntriesEntryType["PAYMENT"] = "PAYMENT";
    JournalEntriesEntryType["RECEIPT"] = "RECEIPT";
    JournalEntriesEntryType["ADJUSTMENT"] = "ADJUSTMENT";
    JournalEntriesEntryType["DEPRECIATION"] = "DEPRECIATION";
    JournalEntriesEntryType["ACCRUAL"] = "ACCRUAL";
    JournalEntriesEntryType["PAYROLL"] = "PAYROLL";
    JournalEntriesEntryType["TAX"] = "TAX";
})(JournalEntriesEntryType || (exports.JournalEntriesEntryType = JournalEntriesEntryType = {}));
var JournalEntriesStatus;
(function (JournalEntriesStatus) {
    JournalEntriesStatus["DRAFT"] = "draft";
    JournalEntriesStatus["POSTED"] = "posted";
    JournalEntriesStatus["VOID"] = "void";
})(JournalEntriesStatus || (exports.JournalEntriesStatus = JournalEntriesStatus = {}));
//# sourceMappingURL=JournalEntries.js.map