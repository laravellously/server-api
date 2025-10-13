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
exports.Leads = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const LeadSources_1 = require("./LeadSources");
const LeadStatuses_1 = require("./LeadStatuses");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let Leads = class Leads {
    [core_1.PrimaryKeyProp];
    leadId;
    org;
    location;
    leadNumber;
    firstName;
    lastName;
    companyName;
    email;
    phone;
    mobile;
    address;
    city;
    state;
    country = 'NG';
    source;
    status;
    assignedTo;
    estimatedValue;
    expectedCloseDate;
    convertedToCustomer = false;
    customer;
    convertedAt;
    convertedBy;
    notes;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Leads = Leads;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Leads.prototype, "leadId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_leads_org', expression: 'CREATE INDEX idx_leads_org ON crm.leads USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Leads.prototype, "org", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_leads_location', expression: 'CREATE INDEX idx_leads_location ON crm.leads USING btree (location_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Leads.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Leads.prototype, "leadNumber", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "companyName", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_leads_email', expression: 'CREATE INDEX idx_leads_email ON crm.leads USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' }),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "mobile", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "country", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => LeadSources_1.LeadSources, fieldName: 'source_id', nullable: true }),
    __metadata("design:type", LeadSources_1.LeadSources)
], Leads.prototype, "source", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_leads_status', expression: 'CREATE INDEX idx_leads_status ON crm.leads USING btree (status_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => LeadStatuses_1.LeadStatuses, fieldName: 'status_id' }),
    __metadata("design:type", LeadStatuses_1.LeadStatuses)
], Leads.prototype, "status", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_leads_assigned', expression: 'CREATE INDEX idx_leads_assigned ON crm.leads USING btree (assigned_to) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'assigned_to', nullable: true }),
    __metadata("design:type", Users_1.Users)
], Leads.prototype, "assignedTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "estimatedValue", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Leads.prototype, "convertedToCustomer", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id', nullable: true }),
    __metadata("design:type", Customers_1.Customers)
], Leads.prototype, "customer", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Leads.prototype, "convertedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "convertedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Leads.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Leads.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Leads.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "updatedBy", void 0);
exports.Leads = Leads = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Sales leads with conversion tracking to customers' }),
    (0, core_1.Index)({ name: 'idx_leads_converted', properties: ['org', 'convertedToCustomer'] }),
    (0, core_1.Unique)({ name: 'leads_org_id_lead_number_key', properties: ['org', 'leadNumber'] })
], Leads);
//# sourceMappingURL=Leads.js.map