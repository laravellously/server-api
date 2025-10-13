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
exports.JournalBatchesStatus = exports.JournalBatches = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let JournalBatches = class JournalBatches {
    [core_1.PrimaryKeyProp];
    batchId;
    org;
    batchNumber;
    batchDate;
    description;
    status = JournalBatchesStatus.DRAFT;
    postedAt;
    postedBy;
    createdAt;
    createdBy;
};
exports.JournalBatches = JournalBatches;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], JournalBatches.prototype, "batchId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], JournalBatches.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], JournalBatches.prototype, "batchNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], JournalBatches.prototype, "batchDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JournalBatches.prototype, "description", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => JournalBatchesStatus }),
    __metadata("design:type", Object)
], JournalBatches.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], JournalBatches.prototype, "postedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], JournalBatches.prototype, "postedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], JournalBatches.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], JournalBatches.prototype, "createdBy", void 0);
exports.JournalBatches = JournalBatches = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Journal entry batches for grouping related transactions' }),
    (0, core_1.Index)({ name: 'idx_journal_batches_org', properties: ['org', 'batchDate'] }),
    (0, core_1.Index)({ name: 'idx_journal_batches_status', properties: ['org', 'status'] }),
    (0, core_1.Unique)({ name: 'journal_batches_org_id_batch_number_key', properties: ['org', 'batchNumber'] })
], JournalBatches);
var JournalBatchesStatus;
(function (JournalBatchesStatus) {
    JournalBatchesStatus["DRAFT"] = "draft";
    JournalBatchesStatus["POSTED"] = "posted";
    JournalBatchesStatus["VOID"] = "void";
})(JournalBatchesStatus || (exports.JournalBatchesStatus = JournalBatchesStatus = {}));
//# sourceMappingURL=JournalBatches.js.map