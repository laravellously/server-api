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
exports.AttendanceStatus = exports.Attendance = void 0;
const core_1 = require("@mikro-orm/core");
const Employees_1 = require("./Employees");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let Attendance = class Attendance {
    [core_1.PrimaryKeyProp];
    attendanceId;
    org;
    employee;
    location;
    attendanceDate;
    checkInTime;
    checkOutTime;
    workHours;
    overtimeHours;
    status = AttendanceStatus.PRESENT;
    notes;
    createdAt;
    updatedAt;
};
exports.Attendance = Attendance;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Attendance.prototype, "attendanceId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Attendance.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], Attendance.prototype, "employee", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Attendance.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], Attendance.prototype, "attendanceDate", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Attendance.prototype, "checkInTime", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Attendance.prototype, "checkOutTime", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "workHours", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], Attendance.prototype, "overtimeHours", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AttendanceStatus }),
    __metadata("design:type", Object)
], Attendance.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Attendance.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Attendance.prototype, "updatedAt", void 0);
exports.Attendance = Attendance = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Daily employee attendance with check-in/out times' }),
    (0, core_1.Index)({ name: 'idx_attendance_employee', properties: ['employee', 'attendanceDate'] }),
    (0, core_1.Index)({ name: 'idx_attendance_location', properties: ['location', 'attendanceDate'] }),
    (0, core_1.Index)({ name: 'idx_attendance_org_date', properties: ['org', 'attendanceDate'] }),
    (0, core_1.Unique)({ name: 'attendance_org_id_employee_id_attendance_date_key', properties: ['org', 'employee', 'attendanceDate'] })
], Attendance);
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "present";
    AttendanceStatus["ABSENT"] = "absent";
    AttendanceStatus["LATE"] = "late";
    AttendanceStatus["HALF_DAY"] = "half_day";
    AttendanceStatus["ON_LEAVE"] = "on_leave";
    AttendanceStatus["HOLIDAY"] = "holiday";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
//# sourceMappingURL=Attendance.js.map