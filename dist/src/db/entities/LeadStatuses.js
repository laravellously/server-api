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
exports.LeadStatuses = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let LeadStatuses = class LeadStatuses {
    [core_1.PrimaryKeyProp];
    statusId;
    org;
    statusCode;
    statusName;
    statusOrder;
    isActive = true;
    createdAt;
};
exports.LeadStatuses = LeadStatuses;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], LeadStatuses.prototype, "statusId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], LeadStatuses.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], LeadStatuses.prototype, "statusCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], LeadStatuses.prototype, "statusName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], LeadStatuses.prototype, "statusOrder", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], LeadStatuses.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeadStatuses.prototype, "createdAt", void 0);
exports.LeadStatuses = LeadStatuses = __decorate([
    (0, core_1.Entity)({ schema: 'crm' }),
    (0, core_1.Index)({ name: 'idx_lead_statuses_org', properties: ['org', 'statusOrder'] }),
    (0, core_1.Unique)({ name: 'lead_statuses_org_id_status_code_key', properties: ['org', 'statusCode'] })
], LeadStatuses);
//# sourceMappingURL=LeadStatuses.js.map