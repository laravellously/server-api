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
exports.UsersRole = exports.UsersStatus = exports.Users = void 0;
const core_1 = require("@mikro-orm/core");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let Users = class Users {
    [core_1.PrimaryKeyProp];
    userId;
    org;
    username;
    email;
    passwordHash;
    firstName;
    lastName;
    phone;
    status = UsersStatus.ACTIVE;
    role;
    default;
    lastLoginAt;
    lastLoginIp;
    failedLoginAttempts = 0;
    passwordChangedAt;
    mustChangePassword = false;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Users = Users;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Users.prototype, "userId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_users_org_id', expression: 'CREATE INDEX idx_users_org_id ON core.users USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Users.prototype, "org", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_users_username', expression: 'CREATE INDEX idx_users_username ON core.users USING btree (username) WHERE (deleted_at IS NULL)' }),
    (0, core_1.Property)({ length: 100, unique: 'users_username_key' }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_users_email', expression: 'CREATE INDEX idx_users_email ON core.users USING btree (email) WHERE (deleted_at IS NULL)' }),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Users.prototype, "passwordHash", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => UsersStatus }),
    __metadata("design:type", Object)
], Users.prototype, "status", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => UsersRole, comment: 'Primary role determines RLS policy enforcement' }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_users_default_location', expression: 'CREATE INDEX idx_users_default_location ON core.users USING btree (default_location_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Users.prototype, "default", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "lastLoginAt", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'inet', nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "lastLoginIp", void 0);
__decorate([
    (0, core_1.Property)({ type: 'integer' }),
    __metadata("design:type", Object)
], Users.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Users.prototype, "mustChangePassword", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "updatedBy", void 0);
exports.Users = Users = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'System users with role-based access control' }),
    (0, core_1.Index)({ name: 'idx_users_role', expression: 'CREATE INDEX idx_users_role ON core.users USING btree (org_id, role) WHERE (deleted_at IS NULL)', properties: ['org', 'role'] })
], Users);
var UsersStatus;
(function (UsersStatus) {
    UsersStatus["ACTIVE"] = "active";
    UsersStatus["SUSPENDED"] = "suspended";
    UsersStatus["LOCKED"] = "locked";
    UsersStatus["INACTIVE"] = "inactive";
})(UsersStatus || (exports.UsersStatus = UsersStatus = {}));
var UsersRole;
(function (UsersRole) {
    UsersRole["SUPER_ADMIN"] = "super_admin";
    UsersRole["ORG_ADMIN"] = "org_admin";
    UsersRole["LOCATION_MANAGER"] = "location_manager";
    UsersRole["ACCOUNTANT"] = "accountant";
    UsersRole["POS_CASHIER"] = "pos_cashier";
    UsersRole["INVENTORY_MANAGER"] = "inventory_manager";
    UsersRole["SALES_REP"] = "sales_rep";
    UsersRole["HR_MANAGER"] = "hr_manager";
    UsersRole["CRM_USER"] = "crm_user";
    UsersRole["READONLY_USER"] = "readonly_user";
})(UsersRole || (exports.UsersRole = UsersRole = {}));
//# sourceMappingURL=Users.js.map