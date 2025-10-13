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
exports.Departments = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let Departments = class Departments {
    [core_1.PrimaryKeyProp];
    departmentId;
    org;
    departmentCode;
    departmentName;
    parent;
    manager;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Departments = Departments;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Departments.prototype, "departmentId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_departments_org', expression: 'CREATE INDEX idx_departments_org ON hrm.departments USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Departments.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Departments.prototype, "departmentCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Departments.prototype, "departmentName", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_departments_parent', expression: 'CREATE INDEX idx_departments_parent ON hrm.departments USING btree (parent_department_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Departments, nullable: true }),
    __metadata("design:type", Departments)
], Departments.prototype, "parent", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, nullable: true }),
    __metadata("design:type", Users_1.Users)
], Departments.prototype, "manager", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Departments.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Departments.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Departments.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Departments.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Departments.prototype, "createdBy", void 0);
exports.Departments = Departments = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Hierarchical department structure' }),
    (0, core_1.Unique)({ name: 'departments_org_id_department_code_key', properties: ['org', 'departmentCode'] })
], Departments);
//# sourceMappingURL=Departments.js.map