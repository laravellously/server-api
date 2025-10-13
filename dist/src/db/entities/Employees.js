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
exports.EmployeesEmploymentStatus = exports.EmployeesEmploymentType = exports.EmployeesMaritalStatus = exports.EmployeesGender = exports.Employees = void 0;
const core_1 = require("@mikro-orm/core");
const Departments_1 = require("./Departments");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
const Positions_1 = require("./Positions");
const Users_1 = require("./Users");
let Employees = class Employees {
    [core_1.PrimaryKeyProp];
    employeeId;
    org;
    user;
    employeeNumber;
    firstName;
    lastName;
    middleName;
    dateOfBirth;
    gender;
    maritalStatus;
    email;
    phone;
    mobile;
    address;
    city;
    state;
    country = 'NG';
    nin;
    bvn;
    taxId;
    position;
    department;
    location;
    manager;
    hireDate;
    terminationDate;
    employmentType = EmployeesEmploymentType.PERMANENT;
    employmentStatus = EmployeesEmploymentStatus.ACTIVE;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Employees = Employees;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Employees.prototype, "employeeId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_employees_org', expression: 'CREATE INDEX idx_employees_org ON hrm.employees USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Employees.prototype, "org", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_employees_user', expression: 'CREATE INDEX idx_employees_user ON hrm.employees USING btree (user_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'user_id', nullable: true }),
    __metadata("design:type", Users_1.Users)
], Employees.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Employees.prototype, "employeeNumber", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Employees.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Employees.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "middleName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "dateOfBirth", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => EmployeesGender, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "gender", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => EmployeesMaritalStatus, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "maritalStatus", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "mobile", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "country", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "nin", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "bvn", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "taxId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Positions_1.Positions, fieldName: 'position_id', nullable: true }),
    __metadata("design:type", Positions_1.Positions)
], Employees.prototype, "position", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_employees_department', expression: 'CREATE INDEX idx_employees_department ON hrm.employees USING btree (department_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Departments_1.Departments, fieldName: 'department_id', nullable: true }),
    __metadata("design:type", Departments_1.Departments)
], Employees.prototype, "department", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_employees_location', expression: 'CREATE INDEX idx_employees_location ON hrm.employees USING btree (location_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Employees.prototype, "location", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_employees_manager', expression: 'CREATE INDEX idx_employees_manager ON hrm.employees USING btree (manager_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Employees, fieldName: 'manager_id', nullable: true }),
    __metadata("design:type", Employees)
], Employees.prototype, "manager", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], Employees.prototype, "hireDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "terminationDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => EmployeesEmploymentType }),
    __metadata("design:type", Object)
], Employees.prototype, "employmentType", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => EmployeesEmploymentStatus }),
    __metadata("design:type", Object)
], Employees.prototype, "employmentStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Employees.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Employees.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "updatedBy", void 0);
exports.Employees = Employees = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Employee master with Nigerian statutory identifiers (NIN, BVN, TIN)' }),
    (0, core_1.Index)({ name: 'idx_employees_status', expression: 'CREATE INDEX idx_employees_status ON hrm.employees USING btree (org_id, employment_status) WHERE (deleted_at IS NULL)', properties: ['org', 'employmentStatus'] }),
    (0, core_1.Unique)({ name: 'employees_org_id_employee_number_key', properties: ['org', 'employeeNumber'] })
], Employees);
var EmployeesGender;
(function (EmployeesGender) {
    EmployeesGender["MALE"] = "male";
    EmployeesGender["FEMALE"] = "female";
    EmployeesGender["OTHER"] = "other";
})(EmployeesGender || (exports.EmployeesGender = EmployeesGender = {}));
var EmployeesMaritalStatus;
(function (EmployeesMaritalStatus) {
    EmployeesMaritalStatus["SINGLE"] = "single";
    EmployeesMaritalStatus["MARRIED"] = "married";
    EmployeesMaritalStatus["DIVORCED"] = "divorced";
    EmployeesMaritalStatus["WIDOWED"] = "widowed";
})(EmployeesMaritalStatus || (exports.EmployeesMaritalStatus = EmployeesMaritalStatus = {}));
var EmployeesEmploymentType;
(function (EmployeesEmploymentType) {
    EmployeesEmploymentType["PERMANENT"] = "permanent";
    EmployeesEmploymentType["CONTRACT"] = "contract";
    EmployeesEmploymentType["TEMPORARY"] = "temporary";
    EmployeesEmploymentType["INTERN"] = "intern";
})(EmployeesEmploymentType || (exports.EmployeesEmploymentType = EmployeesEmploymentType = {}));
var EmployeesEmploymentStatus;
(function (EmployeesEmploymentStatus) {
    EmployeesEmploymentStatus["ACTIVE"] = "active";
    EmployeesEmploymentStatus["ON_LEAVE"] = "on_leave";
    EmployeesEmploymentStatus["SUSPENDED"] = "suspended";
    EmployeesEmploymentStatus["TERMINATED"] = "terminated";
})(EmployeesEmploymentStatus || (exports.EmployeesEmploymentStatus = EmployeesEmploymentStatus = {}));
//# sourceMappingURL=Employees.js.map