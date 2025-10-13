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
exports.SalesOrderLines = void 0;
const core_1 = require("@mikro-orm/core");
const Products_1 = require("./Products");
const SalesOrders_1 = require("./SalesOrders");
const TaxConfigs_1 = require("./TaxConfigs");
const Warehouses_1 = require("./Warehouses");
let SalesOrderLines = class SalesOrderLines {
    [core_1.PrimaryKeyProp];
    orderLineId;
    lineNumber;
    product;
    warehouse;
    batchNumber;
    serialNumber;
    quantity;
    unitPrice;
    discountPercent;
    discountAmount;
    lineSubtotal;
    taxConfig;
    taxAmount;
    lineTotal;
    quantityFulfilled;
    notes;
    createdAt;
    updatedAt;
    'sales.salesOrders';
};
exports.SalesOrderLines = SalesOrderLines;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], SalesOrderLines.prototype, "orderLineId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], SalesOrderLines.prototype, "lineNumber", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', index: 'idx_sales_order_lines_product' }),
    __metadata("design:type", Products_1.Products)
], SalesOrderLines.prototype, "product", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Warehouses_1.Warehouses, fieldName: 'warehouse_id', index: 'idx_sales_order_lines_warehouse' }),
    __metadata("design:type", Warehouses_1.Warehouses)
], SalesOrderLines.prototype, "warehouse", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "batchNumber", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "serialNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "quantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "unitPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "discountPercent", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "discountAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '((quantity * unit_price) - discount_amount) stored', nullable: true }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "lineSubtotal", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => TaxConfigs_1.TaxConfigs, fieldName: 'tax_config_id', nullable: true }),
    __metadata("design:type", TaxConfigs_1.TaxConfigs)
], SalesOrderLines.prototype, "taxConfig", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "taxAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(((quantity * unit_price) - discount_amount) + tax_amount) stored', nullable: true }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "lineTotal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrderLines.prototype, "quantityFulfilled", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SalesOrderLines.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesOrderLines.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesOrderLines.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => SalesOrders_1.SalesOrders, fieldNames: ['org_id', 'order_id', 'order_date'], deleteRule: 'cascade' }),
    __metadata("design:type", SalesOrders_1.SalesOrders)
], SalesOrderLines.prototype, "sales.salesOrders", void 0);
exports.SalesOrderLines = SalesOrderLines = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Line items for sales orders with pricing, discounts, and taxes' }),
    (0, core_1.Index)({ name: 'idx_sales_order_lines_order', expression: 'create index "idx_sales_order_lines_order" on "sales_order_lines" ("org_id", "order_id")' }),
    (0, core_1.Unique)({ name: 'sales_order_lines_org_id_order_id_line_number_key', expression: 'create unique index "sales_order_lines_org_id_order_id_line_number_key" on "sales_order_lines" ("org_id", "order_id", "line_number")' })
], SalesOrderLines);
//# sourceMappingURL=SalesOrderLines.js.map