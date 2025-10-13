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
exports.PriceListItems = void 0;
const core_1 = require("@mikro-orm/core");
const PriceLists_1 = require("./PriceLists");
const Products_1 = require("./Products");
let PriceListItems = class PriceListItems {
    [core_1.PrimaryKeyProp];
    priceListItemId;
    priceList;
    product;
    unitPrice;
    minQuantity;
    maxQuantity;
    createdAt;
    updatedAt;
    createdBy;
};
exports.PriceListItems = PriceListItems;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], PriceListItems.prototype, "priceListItemId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => PriceLists_1.PriceLists, fieldName: 'price_list_id', deleteRule: 'cascade', index: 'idx_price_list_items_price_list' }),
    __metadata("design:type", PriceLists_1.PriceLists)
], PriceListItems.prototype, "priceList", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', deleteRule: 'cascade', index: 'idx_price_list_items_product' }),
    __metadata("design:type", Products_1.Products)
], PriceListItems.prototype, "product", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], PriceListItems.prototype, "unitPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `1` }),
    __metadata("design:type", String)
], PriceListItems.prototype, "minQuantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true }),
    __metadata("design:type", String)
], PriceListItems.prototype, "maxQuantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PriceListItems.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], PriceListItems.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PriceListItems.prototype, "createdBy", void 0);
exports.PriceListItems = PriceListItems = __decorate([
    (0, core_1.Entity)({ schema: 'sales' }),
    (0, core_1.Unique)({ name: 'price_list_items_price_list_id_product_id_min_quantity_key', properties: ['priceList', 'product', 'minQuantity'] })
], PriceListItems);
//# sourceMappingURL=PriceListItems.js.map