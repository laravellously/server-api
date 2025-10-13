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
exports.Opportunities = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Leads_1 = require("./Leads");
const Locations_1 = require("./Locations");
const OpportunityStages_1 = require("./OpportunityStages");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let Opportunities = class Opportunities {
    [core_1.PrimaryKeyProp];
    opportunityId;
    org;
    location;
    opportunityNumber;
    opportunityName;
    customer;
    lead;
    stage;
    assignedTo;
    expectedValue;
    probability;
    expectedCloseDate;
    actualCloseDate;
    currency = 'NGN';
    isClosed = false;
    isWon = false;
    closedReason;
    notes;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Opportunities = Opportunities;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Opportunities.prototype, "opportunityId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_opportunities_org', expression: 'CREATE INDEX idx_opportunities_org ON crm.opportunities USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Opportunities.prototype, "org", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_opportunities_location', expression: 'CREATE INDEX idx_opportunities_location ON crm.opportunities USING btree (location_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Opportunities.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Opportunities.prototype, "opportunityNumber", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Opportunities.prototype, "opportunityName", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_opportunities_customer', expression: 'CREATE INDEX idx_opportunities_customer ON crm.opportunities USING btree (customer_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id', nullable: true }),
    __metadata("design:type", Customers_1.Customers)
], Opportunities.prototype, "customer", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Leads_1.Leads, fieldName: 'lead_id', nullable: true }),
    __metadata("design:type", Leads_1.Leads)
], Opportunities.prototype, "lead", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_opportunities_stage', expression: 'CREATE INDEX idx_opportunities_stage ON crm.opportunities USING btree (stage_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => OpportunityStages_1.OpportunityStages, fieldName: 'stage_id' }),
    __metadata("design:type", OpportunityStages_1.OpportunityStages)
], Opportunities.prototype, "stage", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_opportunities_assigned', expression: 'CREATE INDEX idx_opportunities_assigned ON crm.opportunities USING btree (assigned_to) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'assigned_to', nullable: true }),
    __metadata("design:type", Users_1.Users)
], Opportunities.prototype, "assignedTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Opportunities.prototype, "expectedValue", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "probability", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "actualCloseDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], Opportunities.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Opportunities.prototype, "isClosed", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Opportunities.prototype, "isWon", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "closedReason", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Opportunities.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Opportunities.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Opportunities.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Opportunities.prototype, "updatedBy", void 0);
exports.Opportunities = Opportunities = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Sales opportunities with pipeline tracking' }),
    (0, core_1.Index)({ name: 'idx_opportunities_close_date', expression: 'CREATE INDEX idx_opportunities_close_date ON crm.opportunities USING btree (org_id, expected_close_date) WHERE (NOT is_closed)', properties: ['org', 'expectedCloseDate'] }),
    (0, core_1.Unique)({ name: 'opportunities_org_id_opportunity_number_key', properties: ['org', 'opportunityNumber'] })
], Opportunities);
//# sourceMappingURL=Opportunities.js.map