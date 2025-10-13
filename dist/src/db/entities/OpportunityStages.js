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
exports.OpportunityStages = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let OpportunityStages = class OpportunityStages {
    [core_1.PrimaryKeyProp];
    stageId;
    org;
    stageCode;
    stageName;
    stageOrder;
    probability;
    isClosed = false;
    isWon = false;
    isActive = true;
    createdAt;
};
exports.OpportunityStages = OpportunityStages;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], OpportunityStages.prototype, "stageId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], OpportunityStages.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], OpportunityStages.prototype, "stageCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], OpportunityStages.prototype, "stageName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], OpportunityStages.prototype, "stageOrder", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", String)
], OpportunityStages.prototype, "probability", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], OpportunityStages.prototype, "isClosed", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], OpportunityStages.prototype, "isWon", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], OpportunityStages.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], OpportunityStages.prototype, "createdAt", void 0);
exports.OpportunityStages = OpportunityStages = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Sales pipeline stages with win probability' }),
    (0, core_1.Index)({ name: 'idx_opportunity_stages_org', properties: ['org', 'stageOrder'] }),
    (0, core_1.Unique)({ name: 'opportunity_stages_org_id_stage_code_key', properties: ['org', 'stageCode'] })
], OpportunityStages);
//# sourceMappingURL=OpportunityStages.js.map