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
exports.StockMovementsMovementType = exports.StockMovements = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
const Products_1 = require("./Products");
const Warehouses_1 = require("./Warehouses");
let StockMovements = class StockMovements {
    [core_1.PrimaryKeyProp];
    movementId;
    org;
    product;
    warehouse;
    movementType;
    movementDate;
    batchNumber;
    serialNumber;
    quantity;
    unitCost;
    totalCost;
    referenceType;
    referenceId;
    notes;
    createdAt;
    createdBy;
};
exports.StockMovements = StockMovements;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], StockMovements.prototype, "movementId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], StockMovements.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', deleteRule: 'cascade' }),
    __metadata("design:type", Products_1.Products)
], StockMovements.prototype, "product", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Warehouses_1.Warehouses, fieldName: 'warehouse_id', deleteRule: 'cascade' }),
    __metadata("design:type", Warehouses_1.Warehouses)
], StockMovements.prototype, "warehouse", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => StockMovementsMovementType }),
    __metadata("design:type", String)
], StockMovements.prototype, "movementType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], StockMovements.prototype, "movementDate", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_stock_movements_batch', expression: 'CREATE INDEX idx_stock_movements_batch ON ONLY inventory.stock_movements USING btree (batch_number) WHERE (batch_number IS NOT NULL)' }),
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "batchNumber", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "serialNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], StockMovements.prototype, "quantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], StockMovements.prototype, "unitCost", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(abs(quantity) * unit_cost) stored', nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "totalCost", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "referenceType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "referenceId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StockMovements.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], StockMovements.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovements.prototype, "createdBy", void 0);
exports.StockMovements = StockMovements = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Partitioned transaction log of all inventory movements (receipts, issues, transfers, adjustments)' }),
    (0, core_1.Index)({ name: 'idx_stock_movements_org_product', properties: ['org', 'product', 'movementDate'] }),
    (0, core_1.Index)({ name: 'idx_stock_movements_reference', properties: ['referenceType', 'referenceId'] }),
    (0, core_1.Index)({ name: 'idx_stock_movements_warehouse', properties: ['warehouse', 'movementDate'] })
], StockMovements);
var StockMovementsMovementType;
(function (StockMovementsMovementType) {
    StockMovementsMovementType["RECEIPT"] = "RECEIPT";
    StockMovementsMovementType["ISSUE"] = "ISSUE";
    StockMovementsMovementType["TRANSFER_OUT"] = "TRANSFER_OUT";
    StockMovementsMovementType["TRANSFER_IN"] = "TRANSFER_IN";
    StockMovementsMovementType["ADJUSTMENT"] = "ADJUSTMENT";
    StockMovementsMovementType["RETURN"] = "RETURN";
    StockMovementsMovementType["SALE"] = "SALE";
    StockMovementsMovementType["PURCHASE"] = "PURCHASE";
    StockMovementsMovementType["WRITE_OFF"] = "WRITE_OFF";
})(StockMovementsMovementType || (exports.StockMovementsMovementType = StockMovementsMovementType = {}));
//# sourceMappingURL=StockMovements.js.map