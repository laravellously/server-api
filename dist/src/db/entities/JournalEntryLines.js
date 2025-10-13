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
exports.JournalEntryLines = void 0;
const core_1 = require("@mikro-orm/core");
const ChartOfAccounts_1 = require("./ChartOfAccounts");
const JournalEntries_1 = require("./JournalEntries");
const Locations_1 = require("./Locations");
let JournalEntryLines = class JournalEntryLines {
    [core_1.PrimaryKeyProp];
    lineId;
    lineNumber;
    account;
    location;
    debitAmount;
    creditAmount;
    debitBaseCurrency;
    creditBaseCurrency;
    description;
    createdAt;
    'accounting.journalEntries';
};
exports.JournalEntryLines = JournalEntryLines;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], JournalEntryLines.prototype, "lineId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], JournalEntryLines.prototype, "lineNumber", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => ChartOfAccounts_1.ChartOfAccounts, fieldName: 'account_id' }),
    __metadata("design:type", ChartOfAccounts_1.ChartOfAccounts)
], JournalEntryLines.prototype, "account", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_journal_entry_lines_location', expression: 'CREATE INDEX idx_journal_entry_lines_location ON accounting.journal_entry_lines USING btree (location_id) WHERE (location_id IS NOT NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], JournalEntryLines.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], JournalEntryLines.prototype, "debitAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], JournalEntryLines.prototype, "creditAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: 'debit_amount stored', nullable: true }),
    __metadata("design:type", String)
], JournalEntryLines.prototype, "debitBaseCurrency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: 'credit_amount stored', nullable: true }),
    __metadata("design:type", String)
], JournalEntryLines.prototype, "creditBaseCurrency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JournalEntryLines.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], JournalEntryLines.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => JournalEntries_1.JournalEntries, fieldNames: ['org_id', 'entry_id', 'entry_date'], deleteRule: 'cascade' }),
    __metadata("design:type", JournalEntries_1.JournalEntries)
], JournalEntryLines.prototype, "accounting.journalEntries", void 0);
exports.JournalEntryLines = JournalEntryLines = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Journal entry line items enforcing double-entry bookkeeping (debit/credit)' }),
    (0, core_1.Index)({ name: 'idx_journal_entry_lines_account', expression: 'create index "idx_journal_entry_lines_account" on "journal_entry_lines" ("account_id", "entry_date")' }),
    (0, core_1.Index)({ name: 'idx_journal_entry_lines_entry', expression: 'create index "idx_journal_entry_lines_entry" on "journal_entry_lines" ("org_id", "entry_id")' }),
    (0, core_1.Unique)({ name: 'journal_entry_lines_org_id_entry_id_line_number_key', expression: 'create unique index "journal_entry_lines_org_id_entry_id_line_number_key" on "journal_entry_lines" ("org_id", "entry_id", "line_number")' })
], JournalEntryLines);
//# sourceMappingURL=JournalEntryLines.js.map