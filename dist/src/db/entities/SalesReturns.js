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
exports.SalesReturnsReturnStatus = exports.SalesReturnsReturnType = exports.SalesReturns = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let SalesReturns = class SalesReturns {
    [core_1.PrimaryKeyProp];
    returnId;
    org;
    location;
    returnNumber;
    returnDate;
    orderId;
    invoiceId;
    customer;
    returnReason;
    returnType = SalesReturnsReturnType.REFUND;
    currency = 'NGN';
    totalAmount;
    refundAmount;
    returnStatus = SalesReturnsReturnStatus.PENDING;
    notes;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.SalesReturns = SalesReturns;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "returnId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], SalesReturns.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade' }),
    __metadata("design:type", Locations_1.Locations)
], SalesReturns.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], SalesReturns.prototype, "returnNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "returnDate", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_sales_returns_order', expression: 'CREATE INDEX idx_sales_returns_order ON sales.sales_returns USING btree (order_id) WHERE (order_id IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalesReturns.prototype, "orderId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalesReturns.prototype, "invoiceId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id' }),
    __metadata("design:type", Customers_1.Customers)
], SalesReturns.prototype, "customer", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], SalesReturns.prototype, "returnReason", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => SalesReturnsReturnType }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "returnType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "totalAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "refundAmount", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => SalesReturnsReturnStatus }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "returnStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SalesReturns.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesReturns.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], SalesReturns.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalesReturns.prototype, "updatedBy", void 0);
exports.SalesReturns = SalesReturns = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Product returns with refund/exchange tracking' }),
    (0, core_1.Index)({ name: 'idx_sales_returns_customer', properties: ['customer', 'returnDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_returns_org', properties: ['org', 'returnDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_returns_status', properties: ['org', 'returnStatus'] }),
    (0, core_1.Unique)({ name: 'sales_returns_org_id_return_number_key', properties: ['org', 'returnNumber'] })
], SalesReturns);
var SalesReturnsReturnType;
(function (SalesReturnsReturnType) {
    SalesReturnsReturnType["REFUND"] = "refund";
    SalesReturnsReturnType["EXCHANGE"] = "exchange";
    SalesReturnsReturnType["CREDIT"] = "credit";
})(SalesReturnsReturnType || (exports.SalesReturnsReturnType = SalesReturnsReturnType = {}));
var SalesReturnsReturnStatus;
(function (SalesReturnsReturnStatus) {
    SalesReturnsReturnStatus["PENDING"] = "pending";
    SalesReturnsReturnStatus["APPROVED"] = "approved";
    SalesReturnsReturnStatus["COMPLETED"] = "completed";
    SalesReturnsReturnStatus["REJECTED"] = "rejected";
})(SalesReturnsReturnStatus || (exports.SalesReturnsReturnStatus = SalesReturnsReturnStatus = {}));
//# sourceMappingURL=SalesReturns.js.map