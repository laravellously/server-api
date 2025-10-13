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
exports.OrganizationsStatus = exports.Organizations = void 0;
const core_1 = require("@mikro-orm/core");
let Organizations = class Organizations {
    [core_1.PrimaryKeyProp];
    orgId;
    orgCode;
    orgName;
    legalName;
    taxId;
    vatRegistration;
    baseCurrency = 'NGN';
    fiscalYearStart = 1;
    timezone = 'Africa/Lagos';
    address;
    city;
    state;
    country = 'NG';
    phone;
    email;
    website;
    status = OrganizationsStatus.ACTIVE;
    subscriptionTier;
    subscriptionExpiresAt;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Organizations = Organizations;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Organizations.prototype, "orgId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_organizations_org_code', expression: 'CREATE INDEX idx_organizations_org_code ON core.organizations USING btree (org_code) WHERE (deleted_at IS NULL)' }),
    (0, core_1.Property)({ length: 20, unique: 'organizations_org_code_key' }),
    __metadata("design:type", String)
], Organizations.prototype, "orgCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Organizations.prototype, "orgName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "legalName", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true, comment: 'Nigerian Tax Identification Number (TIN)' }),
    __metadata("design:type", String)
], Organizations.prototype, "taxId", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true, comment: 'VAT registration number if applicable' }),
    __metadata("design:type", String)
], Organizations.prototype, "vatRegistration", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], Organizations.prototype, "baseCurrency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'integer' }),
    __metadata("design:type", Object)
], Organizations.prototype, "fiscalYearStart", void 0);
__decorate([
    (0, core_1.Property)({ type: 'string', length: 50 }),
    __metadata("design:type", Object)
], Organizations.prototype, "timezone", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2 }),
    __metadata("design:type", Object)
], Organizations.prototype, "country", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "website", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_organizations_status', expression: 'CREATE INDEX idx_organizations_status ON core.organizations USING btree (status) WHERE (deleted_at IS NULL)' }),
    (0, core_1.Enum)({ items: () => OrganizationsStatus }),
    __metadata("design:type", Object)
], Organizations.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "subscriptionTier", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Organizations.prototype, "subscriptionExpiresAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Organizations.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Organizations.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Organizations.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Organizations.prototype, "updatedBy", void 0);
exports.Organizations = Organizations = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'Tenant organizations - each represents a separate business entity' })
], Organizations);
var OrganizationsStatus;
(function (OrganizationsStatus) {
    OrganizationsStatus["ACTIVE"] = "active";
    OrganizationsStatus["SUSPENDED"] = "suspended";
    OrganizationsStatus["CLOSED"] = "closed";
})(OrganizationsStatus || (exports.OrganizationsStatus = OrganizationsStatus = {}));
//# sourceMappingURL=Organizations.js.map