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
exports.LeadSources = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let LeadSources = class LeadSources {
    [core_1.PrimaryKeyProp];
    sourceId;
    org;
    sourceCode;
    sourceName;
    isActive = true;
    createdAt;
};
exports.LeadSources = LeadSources;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], LeadSources.prototype, "sourceId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_lead_sources_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], LeadSources.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], LeadSources.prototype, "sourceCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], LeadSources.prototype, "sourceName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], LeadSources.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], LeadSources.prototype, "createdAt", void 0);
exports.LeadSources = LeadSources = __decorate([
    (0, core_1.Entity)({ schema: 'crm' }),
    (0, core_1.Unique)({ name: 'lead_sources_org_id_source_code_key', properties: ['org', 'sourceCode'] })
], LeadSources);
//# sourceMappingURL=LeadSources.js.map