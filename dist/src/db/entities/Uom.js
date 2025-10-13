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
exports.Uom = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let Uom = class Uom {
    [core_1.PrimaryKeyProp];
    uomId;
    org;
    uomCode;
    uomName;
    base;
    conversionFactor;
    isActive = true;
    createdAt;
};
exports.Uom = Uom;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Uom.prototype, "uomId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_uom_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], Uom.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 20 }),
    __metadata("design:type", String)
], Uom.prototype, "uomCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Uom.prototype, "uomName", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Uom, nullable: true }),
    __metadata("design:type", Uom)
], Uom.prototype, "base", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` }),
    __metadata("design:type", String)
], Uom.prototype, "conversionFactor", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Uom.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Uom.prototype, "createdAt", void 0);
exports.Uom = Uom = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Units of measure with base unit conversion factors' }),
    (0, core_1.Unique)({ name: 'uom_org_id_uom_code_key', properties: ['org', 'uomCode'] })
], Uom);
//# sourceMappingURL=Uom.js.map