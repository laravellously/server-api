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
exports.ProductsCostMethod = exports.ProductsProductType = exports.Products = void 0;
const core_1 = require("@mikro-orm/core");
const Brands_1 = require("./Brands");
const Organizations_1 = require("./Organizations");
const ProductCategories_1 = require("./ProductCategories");
const TaxConfigs_1 = require("./TaxConfigs");
const Uom_1 = require("./Uom");
let Products = class Products {
    [core_1.PrimaryKeyProp];
    productId;
    org;
    sku;
    barcode;
    productName;
    description;
    category;
    brand;
    uom;
    productType = ProductsProductType.STANDARD;
    isSerialized = false;
    isBatchTracked = false;
    hasExpiry = false;
    costMethod = ProductsCostMethod.FIFO;
    standardCost;
    baseSellingPrice;
    reorderLevel;
    reorderQuantity;
    taxConfig;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Products = Products;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Products.prototype, "productId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_products_org', expression: 'CREATE INDEX idx_products_org ON inventory.products USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Products.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Products.prototype, "sku", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_products_barcode', expression: 'CREATE INDEX idx_products_barcode ON inventory.products USING btree (barcode) WHERE ((deleted_at IS NULL) AND (barcode IS NOT NULL))' }),
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "barcode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Products.prototype, "productName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_products_category', expression: 'CREATE INDEX idx_products_category ON inventory.products USING btree (category_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => ProductCategories_1.ProductCategories, fieldName: 'category_id', nullable: true }),
    __metadata("design:type", ProductCategories_1.ProductCategories)
], Products.prototype, "category", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_products_brand', expression: 'CREATE INDEX idx_products_brand ON inventory.products USING btree (brand_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Brands_1.Brands, fieldName: 'brand_id', nullable: true }),
    __metadata("design:type", Brands_1.Brands)
], Products.prototype, "brand", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Uom_1.Uom, fieldName: 'uom_id' }),
    __metadata("design:type", Uom_1.Uom)
], Products.prototype, "uom", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ProductsProductType }),
    __metadata("design:type", Object)
], Products.prototype, "productType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Products.prototype, "isSerialized", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Products.prototype, "isBatchTracked", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Products.prototype, "hasExpiry", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ProductsCostMethod, comment: 'Inventory costing: FIFO, LIFO, or Weighted Average Cost' }),
    __metadata("design:type", Object)
], Products.prototype, "costMethod", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Products.prototype, "standardCost", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Products.prototype, "baseSellingPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], Products.prototype, "reorderLevel", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], Products.prototype, "reorderQuantity", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => TaxConfigs_1.TaxConfigs, fieldName: 'tax_config_id', nullable: true }),
    __metadata("design:type", TaxConfigs_1.TaxConfigs)
], Products.prototype, "taxConfig", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Products.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Products.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Products.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "updatedBy", void 0);
exports.Products = Products = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Master product catalog with SKUs, costing methods, and tracking options' }),
    (0, core_1.Index)({ name: 'idx_products_active', expression: 'CREATE INDEX idx_products_active ON inventory.products USING btree (org_id, is_active) WHERE (deleted_at IS NULL)', properties: ['org', 'isActive'] }),
    (0, core_1.Index)({ name: 'idx_products_sku', expression: 'CREATE INDEX idx_products_sku ON inventory.products USING btree (org_id, sku) WHERE (deleted_at IS NULL)', properties: ['org', 'sku'] }),
    (0, core_1.Unique)({ name: 'products_org_id_sku_key', properties: ['org', 'sku'] })
], Products);
var ProductsProductType;
(function (ProductsProductType) {
    ProductsProductType["STANDARD"] = "standard";
    ProductsProductType["SERVICE"] = "service";
    ProductsProductType["DIGITAL"] = "digital";
    ProductsProductType["BUNDLE"] = "bundle";
})(ProductsProductType || (exports.ProductsProductType = ProductsProductType = {}));
var ProductsCostMethod;
(function (ProductsCostMethod) {
    ProductsCostMethod["FIFO"] = "FIFO";
    ProductsCostMethod["LIFO"] = "LIFO";
    ProductsCostMethod["WAC"] = "WAC";
})(ProductsCostMethod || (exports.ProductsCostMethod = ProductsCostMethod = {}));
//# sourceMappingURL=Products.js.map