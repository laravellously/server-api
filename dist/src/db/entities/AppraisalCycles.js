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
exports.AppraisalCyclesStatus = exports.AppraisalCycles = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let AppraisalCycles = class AppraisalCycles {
    [core_1.PrimaryKeyProp];
    cycleId;
    org;
    cycleName;
    startDate;
    endDate;
    status = AppraisalCyclesStatus.DRAFT;
    createdAt;
    createdBy;
};
exports.AppraisalCycles = AppraisalCycles;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], AppraisalCycles.prototype, "cycleId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], AppraisalCycles.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], AppraisalCycles.prototype, "cycleName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], AppraisalCycles.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], AppraisalCycles.prototype, "endDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AppraisalCyclesStatus }),
    __metadata("design:type", Object)
], AppraisalCycles.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], AppraisalCycles.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AppraisalCycles.prototype, "createdBy", void 0);
exports.AppraisalCycles = AppraisalCycles = __decorate([
    (0, core_1.Entity)({ schema: 'hrm', comment: 'Performance appraisal cycles/periods' }),
    (0, core_1.Index)({ name: 'idx_appraisal_cycles_org', properties: ['org', 'startDate'] }),
    (0, core_1.Unique)({ name: 'appraisal_cycles_org_id_cycle_name_key', properties: ['org', 'cycleName'] })
], AppraisalCycles);
var AppraisalCyclesStatus;
(function (AppraisalCyclesStatus) {
    AppraisalCyclesStatus["DRAFT"] = "draft";
    AppraisalCyclesStatus["ACTIVE"] = "active";
    AppraisalCyclesStatus["COMPLETED"] = "completed";
    AppraisalCyclesStatus["CANCELLED"] = "cancelled";
})(AppraisalCyclesStatus || (exports.AppraisalCyclesStatus = AppraisalCyclesStatus = {}));
//# sourceMappingURL=AppraisalCycles.js.map