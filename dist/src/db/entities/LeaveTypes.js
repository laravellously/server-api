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
exports.LeaveTypes = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let LeaveTypes = class LeaveTypes {
    [core_1.PrimaryKeyProp];
    leaveTypeId;
    org;
    typeCode;
    typeName;
    defaultDays;
    isPaid = true;
    requiresApproval = true;
    isActive = true;
    createdAt;
};
exports.LeaveTypes = LeaveTypes;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], LeaveTypes.prototype, "leaveTypeId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_leave_types_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], LeaveTypes.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], LeaveTypes.prototype, "typeCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], LeaveTypes.prototype, "typeName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], LeaveTypes.prototype, "defaultDays", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], LeaveTypes.prototype, "isPaid", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], LeaveTypes.prototype, "requiresApproval", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], LeaveTypes.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeaveTypes.prototype, "createdAt", void 0);
exports.LeaveTypes = LeaveTypes = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Leave types (annual, sick, maternity, etc.)' }),
    (0, core_1.Unique)({ name: 'leave_types_org_id_type_code_key', properties: ['org', 'typeCode'] })
], LeaveTypes);
//# sourceMappingURL=LeaveTypes.js.map