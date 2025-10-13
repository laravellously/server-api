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
exports.AuditLogOperation = exports.AuditLog = void 0;
const core_1 = require("@mikro-orm/core");
let AuditLog = class AuditLog {
    [core_1.PrimaryKeyProp];
    auditId;
    orgId;
    tableSchema;
    tableName;
    operation;
    recordId;
    oldData;
    newData;
    changedFields;
    performedAt;
    performedBy;
    ipAddress;
    userAgent;
};
exports.AuditLog = AuditLog;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], AuditLog.prototype, "auditId", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], AuditLog.prototype, "orgId", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], AuditLog.prototype, "tableSchema", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], AuditLog.prototype, "tableName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AuditLogOperation }),
    __metadata("design:type", String)
], AuditLog.prototype, "operation", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], AuditLog.prototype, "recordId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "oldData", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "newData", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Array)
], AuditLog.prototype, "changedFields", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], AuditLog.prototype, "performedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "performedBy", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'inet', nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "userAgent", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, core_1.Entity)({ schema: 'audit', comment: 'Comprehensive audit trail for all data changes, partitioned by time' }),
    (0, core_1.Index)({ name: 'idx_audit_log_org_table', properties: ['orgId', 'tableSchema', 'tableName', 'performedAt'] }),
    (0, core_1.Index)({ name: 'idx_audit_log_record', properties: ['recordId', 'performedAt'] }),
    (0, core_1.Index)({ name: 'idx_audit_log_user', properties: ['performedBy', 'performedAt'] })
], AuditLog);
var AuditLogOperation;
(function (AuditLogOperation) {
    AuditLogOperation["INSERT"] = "INSERT";
    AuditLogOperation["UPDATE"] = "UPDATE";
    AuditLogOperation["DELETE"] = "DELETE";
})(AuditLogOperation || (exports.AuditLogOperation = AuditLogOperation = {}));
//# sourceMappingURL=AuditLog.js.map