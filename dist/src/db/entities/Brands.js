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
exports.Brands = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let Brands = class Brands {
    [core_1.PrimaryKeyProp];
    brandId;
    org;
    brandCode;
    brandName;
    description;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Brands = Brands;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Brands.prototype, "brandId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_brands_org', expression: 'CREATE INDEX idx_brands_org ON inventory.brands USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Brands.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Brands.prototype, "brandCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Brands.prototype, "brandName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Brands.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Brands.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Brands.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Brands.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Brands.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Brands.prototype, "createdBy", void 0);
exports.Brands = Brands = __decorate([
    (0, core_1.Entity)({ schema: 'inventory' }),
    (0, core_1.Unique)({ name: 'brands_org_id_brand_code_key', properties: ['org', 'brandCode'] })
], Brands);
//# sourceMappingURL=Brands.js.map