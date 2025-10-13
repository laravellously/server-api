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
exports.ActivitiesStatus = exports.ActivitiesPriority = exports.Activities = void 0;
const core_1 = require("@mikro-orm/core");
const ActivityTypes_1 = require("./ActivityTypes");
const Customers_1 = require("./Customers");
const Leads_1 = require("./Leads");
const Locations_1 = require("./Locations");
const Opportunities_1 = require("./Opportunities");
const Organizations_1 = require("./Organizations");
const Users_1 = require("./Users");
let Activities = class Activities {
    [core_1.PrimaryKeyProp];
    activityId;
    org;
    location;
    activityType;
    subject;
    description;
    activityDate;
    dueDate;
    completedDate;
    priority = ActivitiesPriority.MEDIUM;
    status = ActivitiesStatus.PENDING;
    customer;
    lead;
    opportunity;
    assignedTo;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.Activities = Activities;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Activities.prototype, "activityId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Activities.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true, index: 'idx_activities_location' }),
    __metadata("design:type", Locations_1.Locations)
], Activities.prototype, "location", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => ActivityTypes_1.ActivityTypes, fieldName: 'activity_type_id' }),
    __metadata("design:type", ActivityTypes_1.ActivityTypes)
], Activities.prototype, "activityType", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Activities.prototype, "subject", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activities.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Activities.prototype, "activityDate", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Activities.prototype, "dueDate", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Activities.prototype, "completedDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ActivitiesPriority, nullable: true }),
    __metadata("design:type", String)
], Activities.prototype, "priority", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ActivitiesStatus }),
    __metadata("design:type", Object)
], Activities.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id', nullable: true }),
    __metadata("design:type", Customers_1.Customers)
], Activities.prototype, "customer", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Leads_1.Leads, fieldName: 'lead_id', nullable: true }),
    __metadata("design:type", Leads_1.Leads)
], Activities.prototype, "lead", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Opportunities_1.Opportunities, fieldName: 'opportunity_id', nullable: true }),
    __metadata("design:type", Opportunities_1.Opportunities)
], Activities.prototype, "opportunity", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'assigned_to' }),
    __metadata("design:type", Users_1.Users)
], Activities.prototype, "assignedTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Activities.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Activities.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], Activities.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Activities.prototype, "updatedBy", void 0);
exports.Activities = Activities = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Customer interaction activities and tasks' }),
    (0, core_1.Index)({ name: 'idx_activities_assigned', properties: ['assignedTo', 'activityDate'] }),
    (0, core_1.Index)({ name: 'idx_activities_customer', properties: ['customer', 'activityDate'] }),
    (0, core_1.Index)({ name: 'idx_activities_lead', properties: ['lead', 'activityDate'] }),
    (0, core_1.Index)({ name: 'idx_activities_opportunity', properties: ['opportunity', 'activityDate'] }),
    (0, core_1.Index)({ name: 'idx_activities_org', properties: ['org', 'activityDate'] }),
    (0, core_1.Index)({ name: 'idx_activities_status', properties: ['org', 'status', 'dueDate'] })
], Activities);
var ActivitiesPriority;
(function (ActivitiesPriority) {
    ActivitiesPriority["LOW"] = "low";
    ActivitiesPriority["MEDIUM"] = "medium";
    ActivitiesPriority["HIGH"] = "high";
    ActivitiesPriority["URGENT"] = "urgent";
})(ActivitiesPriority || (exports.ActivitiesPriority = ActivitiesPriority = {}));
var ActivitiesStatus;
(function (ActivitiesStatus) {
    ActivitiesStatus["PENDING"] = "pending";
    ActivitiesStatus["IN_PROGRESS"] = "in_progress";
    ActivitiesStatus["COMPLETED"] = "completed";
    ActivitiesStatus["CANCELLED"] = "cancelled";
})(ActivitiesStatus || (exports.ActivitiesStatus = ActivitiesStatus = {}));
//# sourceMappingURL=Activities.js.map