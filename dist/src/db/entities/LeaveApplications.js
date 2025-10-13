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
exports.LeaveApplicationsStatus = exports.LeaveApplications = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
const LeaveTypes_1 = require("./LeaveTypes");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let LeaveApplications = class LeaveApplications {
    [core_1.PrimaryKeyProp];
    applicationId;
    org;
    employee;
    leaveType;
    applicationDate;
    startDate;
    endDate;
    totalDays;
    reason;
    status = LeaveApplicationsStatus.PENDING;
    approvedBy;
    approvedAt;
    rejectionReason;
    createdAt;
    updatedAt;
    createdBy;
};
exports.LeaveApplications = LeaveApplications;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], LeaveApplications.prototype, "applicationId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], LeaveApplications.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], LeaveApplications.prototype, "employee", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => LeaveTypes_1.LeaveTypes, fieldName: 'leave_type_id' }),
    __metadata("design:type", LeaveTypes_1.LeaveTypes)
], LeaveApplications.prototype, "leaveType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', defaultRaw: `CURRENT_DATE` }),
    __metadata("design:type", Object)
], LeaveApplications.prototype, "applicationDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "endDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "totalDays", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "reason", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LeaveApplicationsStatus }),
    __metadata("design:type", Object)
], LeaveApplications.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'approved_by', nullable: true }),
    __metadata("design:type", Users_1.Users)
], LeaveApplications.prototype, "approvedBy", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], LeaveApplications.prototype, "approvedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "rejectionReason", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeaveApplications.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeaveApplications.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], LeaveApplications.prototype, "createdBy", void 0);
exports.LeaveApplications = LeaveApplications = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee leave requests with approval workflow' }),
    (0, core_1.Index)({ name: 'idx_leave_applications_dates', properties: ['org', 'startDate', 'endDate'] }),
    (0, core_1.Index)({ name: 'idx_leave_applications_employee', properties: ['employee', 'applicationDate'] }),
    (0, core_1.Index)({ name: 'idx_leave_applications_org', properties: ['org', 'applicationDate'] }),
    (0, core_1.Index)({ name: 'idx_leave_applications_status', properties: ['org', 'status'] })
], LeaveApplications);
var LeaveApplicationsStatus;
(function (LeaveApplicationsStatus) {
    LeaveApplicationsStatus["PENDING"] = "pending";
    LeaveApplicationsStatus["APPROVED"] = "approved";
    LeaveApplicationsStatus["REJECTED"] = "rejected";
    LeaveApplicationsStatus["CANCELLED"] = "cancelled";
})(LeaveApplicationsStatus || (exports.LeaveApplicationsStatus = LeaveApplicationsStatus = {}));
//# sourceMappingURL=LeaveApplications.js.map