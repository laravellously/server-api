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
exports.FiscalPeriodsStatus = exports.FiscalPeriods = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let FiscalPeriods = class FiscalPeriods {
    [core_1.PrimaryKeyProp];
    periodId;
    org;
    periodCode;
    periodName;
    fiscalYear;
    periodNumber;
    startDate;
    endDate;
    status = FiscalPeriodsStatus.OPEN;
    closedAt;
    closedBy;
    createdAt;
};
exports.FiscalPeriods = FiscalPeriods;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], FiscalPeriods.prototype, "periodId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], FiscalPeriods.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 20 }),
    __metadata("design:type", String)
], FiscalPeriods.prototype, "periodCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], FiscalPeriods.prototype, "periodName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], FiscalPeriods.prototype, "fiscalYear", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], FiscalPeriods.prototype, "periodNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], FiscalPeriods.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], FiscalPeriods.prototype, "endDate", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => FiscalPeriodsStatus }),
    __metadata("design:type", Object)
], FiscalPeriods.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], FiscalPeriods.prototype, "closedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], FiscalPeriods.prototype, "closedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], FiscalPeriods.prototype, "createdAt", void 0);
exports.FiscalPeriods = FiscalPeriods = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Fiscal periods for accounting period closing and reporting' }),
    (0, core_1.Index)({ name: 'idx_fiscal_periods_dates', properties: ['org', 'startDate', 'endDate'] }),
    (0, core_1.Index)({ name: 'idx_fiscal_periods_org', properties: ['org', 'fiscalYear', 'periodNumber'] }),
    (0, core_1.Unique)({ name: 'fiscal_periods_org_id_fiscal_year_period_number_key', properties: ['org', 'fiscalYear', 'periodNumber'] })
], FiscalPeriods);
var FiscalPeriodsStatus;
(function (FiscalPeriodsStatus) {
    FiscalPeriodsStatus["OPEN"] = "open";
    FiscalPeriodsStatus["CLOSED"] = "closed";
    FiscalPeriodsStatus["LOCKED"] = "locked";
})(FiscalPeriodsStatus || (exports.FiscalPeriodsStatus = FiscalPeriodsStatus = {}));
//# sourceMappingURL=FiscalPeriods.js.map