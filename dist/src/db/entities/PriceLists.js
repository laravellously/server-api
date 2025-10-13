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
exports.PriceLists = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let PriceLists = class PriceLists {
    [core_1.PrimaryKeyProp];
    priceListId;
    org;
    priceListCode;
    priceListName;
    description;
    currency = 'NGN';
    isDefault = false;
    effectiveFrom;
    effectiveTo;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.PriceLists = PriceLists;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], PriceLists.prototype, "priceListId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_price_lists_org', expression: 'CREATE INDEX idx_price_lists_org ON sales.price_lists USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], PriceLists.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], PriceLists.prototype, "priceListCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], PriceLists.prototype, "priceListName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PriceLists.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], PriceLists.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], PriceLists.prototype, "isDefault", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", String)
], PriceLists.prototype, "effectiveFrom", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], PriceLists.prototype, "effectiveTo", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], PriceLists.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PriceLists.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PriceLists.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], PriceLists.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PriceLists.prototype, "createdBy", void 0);
exports.PriceLists = PriceLists = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Price lists for different customer segments, channels, or promotions' }),
    (0, core_1.Index)({ name: 'idx_price_lists_effective', expression: 'CREATE INDEX idx_price_lists_effective ON sales.price_lists USING btree (org_id, effective_from, effective_to) WHERE (deleted_at IS NULL)', properties: ['org', 'effectiveFrom', 'effectiveTo'] }),
    (0, core_1.Unique)({ name: 'price_lists_org_id_price_list_code_key', properties: ['org', 'priceListCode'] })
], PriceLists);
//# sourceMappingURL=PriceLists.js.map