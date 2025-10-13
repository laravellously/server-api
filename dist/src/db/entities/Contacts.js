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
exports.Contacts = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Organizations_1 = require("./Organizations");
let Contacts = class Contacts {
    [core_1.PrimaryKeyProp];
    contactId;
    org;
    customer;
    firstName;
    lastName;
    position;
    email;
    phone;
    mobile;
    isPrimary = false;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Contacts = Contacts;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Contacts.prototype, "contactId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Contacts.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id', deleteRule: 'cascade' }),
    __metadata("design:type", Customers_1.Customers)
], Contacts.prototype, "customer", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Contacts.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Contacts.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Contacts.prototype, "position", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_contacts_email', expression: 'CREATE INDEX idx_contacts_email ON crm.contacts USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' }),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Contacts.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Contacts.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Contacts.prototype, "mobile", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Contacts.prototype, "isPrimary", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Contacts.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Contacts.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Contacts.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Contacts.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Contacts.prototype, "createdBy", void 0);
exports.Contacts = Contacts = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Multiple contact persons per customer organization' }),
    (0, core_1.Index)({ name: 'idx_contacts_org_customer', expression: 'CREATE INDEX idx_contacts_org_customer ON crm.contacts USING btree (org_id, customer_id) WHERE (deleted_at IS NULL)', properties: ['org', 'customer'] })
], Contacts);
//# sourceMappingURL=Contacts.js.map