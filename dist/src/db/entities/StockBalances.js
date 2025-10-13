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
exports.StockBalances = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
const Products_1 = require("./Products");
const Warehouses_1 = require("./Warehouses");
let StockBalances = class StockBalances {
    [core_1.PrimaryKeyProp];
    stockBalanceId;
    org;
    product;
    warehouse;
    batchNumber;
    serialNumber;
    expiryDate;
    quantityOnHand;
    quantityReserved;
    quantityAvailable;
    averageCost;
    lastCost;
    updatedAt;
};
exports.StockBalances = StockBalances;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "stockBalanceId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], StockBalances.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', deleteRule: 'cascade' }),
    __metadata("design:type", Products_1.Products)
], StockBalances.prototype, "product", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Warehouses_1.Warehouses, fieldName: 'warehouse_id', deleteRule: 'cascade', index: 'idx_stock_balances_warehouse' }),
    __metadata("design:type", Warehouses_1.Warehouses)
], StockBalances.prototype, "warehouse", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_stock_balances_batch', expression: 'CREATE INDEX idx_stock_balances_batch ON inventory.stock_balances USING btree (batch_number) WHERE (batch_number IS NOT NULL)' }),
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StockBalances.prototype, "batchNumber", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_stock_balances_serial', expression: 'CREATE INDEX idx_stock_balances_serial ON inventory.stock_balances USING btree (serial_number) WHERE (serial_number IS NOT NULL)' }),
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StockBalances.prototype, "serialNumber", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_stock_balances_expiry', expression: 'CREATE INDEX idx_stock_balances_expiry ON inventory.stock_balances USING btree (expiry_date) WHERE (expiry_date IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], StockBalances.prototype, "expiryDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "quantityOnHand", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, comment: 'Quantity allocated to orders but not yet fulfilled', defaultRaw: `0` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "quantityReserved", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(quantity_on_hand - quantity_reserved) stored', nullable: true }),
    __metadata("design:type", String)
], StockBalances.prototype, "quantityAvailable", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "averageCost", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "lastCost", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], StockBalances.prototype, "updatedAt", void 0);
exports.StockBalances = StockBalances = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Real-time stock quantities with batch/lot tracking and reservations' }),
    (0, core_1.Index)({ name: 'idx_stock_balances_org_product', properties: ['org', 'product'] }),
    (0, core_1.Unique)({ name: 'stock_balances_org_id_product_id_warehouse_id_batch_number__key', properties: ['org', 'product', 'warehouse', 'batchNumber', 'serialNumber'] })
], StockBalances);
//# sourceMappingURL=StockBalances.js.map