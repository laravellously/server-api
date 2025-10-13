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
exports.AppraisalsStatus = exports.Appraisals = void 0;
const core_1 = require("@mikro-orm/core");
const AppraisalCycles_1 = require("./AppraisalCycles");
const Employees_1 = require("./Employees");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let Appraisals = class Appraisals {
    [core_1.PrimaryKeyProp];
    appraisalId;
    org;
    cycle;
    employee;
    appraiser;
    appraisalDate;
    overallRating;
    strengths;
    areasForImprovement;
    goalsNextPeriod;
    employeeComments;
    status = AppraisalsStatus.DRAFT;
    createdAt;
    updatedAt;
    createdBy;
};
exports.Appraisals = Appraisals;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Appraisals.prototype, "appraisalId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_appraisals_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], Appraisals.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => AppraisalCycles_1.AppraisalCycles, fieldName: 'cycle_id', deleteRule: 'cascade', index: 'idx_appraisals_cycle' }),
    __metadata("design:type", AppraisalCycles_1.AppraisalCycles)
], Appraisals.prototype, "cycle", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Employees_1.Employees, fieldName: 'employee_id', deleteRule: 'cascade' }),
    __metadata("design:type", Employees_1.Employees)
], Appraisals.prototype, "employee", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'appraiser_id' }),
    __metadata("design:type", Users_1.Users)
], Appraisals.prototype, "appraiser", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], Appraisals.prototype, "appraisalDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "overallRating", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "strengths", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "areasForImprovement", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "goalsNextPeriod", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "employeeComments", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AppraisalsStatus }),
    __metadata("design:type", Object)
], Appraisals.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Appraisals.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Appraisals.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Appraisals.prototype, "createdBy", void 0);
exports.Appraisals = Appraisals = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee performance appraisals' }),
    (0, core_1.Index)({ name: 'idx_appraisals_employee', properties: ['employee', 'appraisalDate'] }),
    (0, core_1.Unique)({ name: 'appraisals_org_id_cycle_id_employee_id_key', properties: ['org', 'cycle', 'employee'] })
], Appraisals);
var AppraisalsStatus;
(function (AppraisalsStatus) {
    AppraisalsStatus["DRAFT"] = "draft";
    AppraisalsStatus["SUBMITTED"] = "submitted";
    AppraisalsStatus["REVIEWED"] = "reviewed";
    AppraisalsStatus["FINALIZED"] = "finalized";
})(AppraisalsStatus || (exports.AppraisalsStatus = AppraisalsStatus = {}));
//# sourceMappingURL=Appraisals.js.map