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
exports.LeaveEntitlements = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
const LeaveTypes_1 = require("./LeaveTypes");
const Organizations_1 = require("./Organizations");
let LeaveEntitlements = class LeaveEntitlements {
    [core_1.PrimaryKeyProp];
    entitlementId;
    org;
    employee;
    leaveType;
    year;
    allocatedDays;
    usedDays;
    remainingDays;
    createdAt;
    updatedAt;
};
exports.LeaveEntitlements = LeaveEntitlements;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], LeaveEntitlements.prototype, "entitlementId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], LeaveEntitlements.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], LeaveEntitlements.prototype, "employee", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => LeaveTypes_1.LeaveTypes, fieldName: 'leave_type_id', deleteRule: 'cascade' }),
    __metadata("design:type", LeaveTypes_1.LeaveTypes)
], LeaveEntitlements.prototype, "leaveType", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], LeaveEntitlements.prototype, "year", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", String)
], LeaveEntitlements.prototype, "allocatedDays", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, defaultRaw: `0` }),
    __metadata("design:type", Object)
], LeaveEntitlements.prototype, "usedDays", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, generated: '(allocated_days - used_days) stored', nullable: true }),
    __metadata("design:type", String)
], LeaveEntitlements.prototype, "remainingDays", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeaveEntitlements.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeaveEntitlements.prototype, "updatedAt", void 0);
exports.LeaveEntitlements = LeaveEntitlements = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Annual leave entitlements per employee' }),
    (0, core_1.Index)({ name: 'idx_leave_entitlements_employee', properties: ['employee', 'year'] }),
    (0, core_1.Unique)({ name: 'leave_entitlements_org_id_employee_id_leave_type_id_year_key', properties: ['org', 'employee', 'leaveType', 'year'] })
], LeaveEntitlements);
//# sourceMappingURL=LeaveEntitlements.js.map