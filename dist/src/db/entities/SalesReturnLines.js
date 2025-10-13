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
exports.SalesReturnLines = void 0;
const core_1 = require("@mikro-orm/core");
const Products_1 = require("./Products");
const SalesReturns_1 = require("./SalesReturns");
const Warehouses_1 = require("./Warehouses");
let SalesReturnLines = class SalesReturnLines {
    [core_1.PrimaryKeyProp];
    returnLineId;
    return;
    lineNumber;
    product;
    quantity;
    unitPrice;
    lineTotal;
    warehouse;
    restocked = false;
    createdAt;
};
exports.SalesReturnLines = SalesReturnLines;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], SalesReturnLines.prototype, "returnLineId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => SalesReturns_1.SalesReturns, fieldName: 'return_id', deleteRule: 'cascade', index: 'idx_sales_return_lines_return' }),
    __metadata("design:type", SalesReturns_1.SalesReturns)
], SalesReturnLines.prototype, "return", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], SalesReturnLines.prototype, "lineNumber", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', index: 'idx_sales_return_lines_product' }),
    __metadata("design:type", Products_1.Products)
], SalesReturnLines.prototype, "product", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], SalesReturnLines.prototype, "quantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], SalesReturnLines.prototype, "unitPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(quantity * unit_price) stored', nullable: true }),
    __metadata("design:type", String)
], SalesReturnLines.prototype, "lineTotal", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Warehouses_1.Warehouses, fieldName: 'warehouse_id', nullable: true }),
    __metadata("design:type", Warehouses_1.Warehouses)
], SalesReturnLines.prototype, "warehouse", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], SalesReturnLines.prototype, "restocked", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesReturnLines.prototype, "createdAt", void 0);
exports.SalesReturnLines = SalesReturnLines = __decorate([
    (0, core_1.Entity)({ schema: 'sales' }),
    (0, core_1.Unique)({ name: 'sales_return_lines_return_id_line_number_key', properties: ['return', 'lineNumber'] })
], SalesReturnLines);
//# sourceMappingURL=SalesReturnLines.js.map