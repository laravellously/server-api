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
exports.ProductCategories = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let ProductCategories = class ProductCategories {
    [core_1.PrimaryKeyProp];
    categoryId;
    org;
    parent;
    categoryCode;
    categoryName;
    description;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.ProductCategories = ProductCategories;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ProductCategories.prototype, "categoryId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_product_categories_org', expression: 'CREATE INDEX idx_product_categories_org ON inventory.product_categories USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], ProductCategories.prototype, "org", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_product_categories_parent', expression: 'CREATE INDEX idx_product_categories_parent ON inventory.product_categories USING btree (parent_category_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => ProductCategories, nullable: true }),
    __metadata("design:type", ProductCategories)
], ProductCategories.prototype, "parent", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], ProductCategories.prototype, "categoryCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], ProductCategories.prototype, "categoryName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], ProductCategories.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ProductCategories.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ProductCategories.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "updatedBy", void 0);
exports.ProductCategories = ProductCategories = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Hierarchical product categories' }),
    (0, core_1.Unique)({ name: 'product_categories_org_id_category_code_key', properties: ['org', 'categoryCode'] })
], ProductCategories);
//# sourceMappingURL=ProductCategories.js.map