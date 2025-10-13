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
exports.SalesOrdersOrderStatus = exports.SalesOrders = void 0;
const core_1 = require("@mikro-orm/core");
const Channels_1 = require("./Channels");
const Customers_1 = require("./Customers");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
const PriceLists_1 = require("./PriceLists");
const Users_1 = require("./Users");
let SalesOrders = class SalesOrders {
    [core_1.PrimaryKeyProp];
    orderId;
    org;
    location;
    channel;
    orderNumber;
    orderDate;
    customer;
    priceList;
    orderStatus = SalesOrdersOrderStatus.DRAFT;
    currency = 'NGN';
    exchangeRate;
    subtotal;
    discountAmount;
    taxAmount;
    totalAmount;
    paidAmount;
    balanceDue;
    notes;
    salesperson;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.SalesOrders = SalesOrders;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "orderId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true }),
    __metadata("design:type", Organizations_1.Organizations)
], SalesOrders.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade' }),
    __metadata("design:type", Locations_1.Locations)
], SalesOrders.prototype, "location", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Channels_1.Channels, fieldName: 'channel_id' }),
    __metadata("design:type", Channels_1.Channels)
], SalesOrders.prototype, "channel", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], SalesOrders.prototype, "orderNumber", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "orderDate", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id' }),
    __metadata("design:type", Customers_1.Customers)
], SalesOrders.prototype, "customer", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => PriceLists_1.PriceLists, fieldName: 'price_list_id', nullable: true }),
    __metadata("design:type", PriceLists_1.PriceLists)
], SalesOrders.prototype, "priceList", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => SalesOrdersOrderStatus }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "orderStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` }),
    __metadata("design:type", String)
], SalesOrders.prototype, "exchangeRate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "subtotal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "discountAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "taxAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "totalAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "paidAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(total_amount - paid_amount) stored', nullable: true }),
    __metadata("design:type", String)
], SalesOrders.prototype, "balanceDue", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SalesOrders.prototype, "notes", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'salesperson_id', nullable: true }),
    __metadata("design:type", Users_1.Users)
], SalesOrders.prototype, "salesperson", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], SalesOrders.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], SalesOrders.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SalesOrders.prototype, "updatedBy", void 0);
exports.SalesOrders = SalesOrders = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Sales orders across all channels, partitioned by order date for performance' }),
    (0, core_1.Index)({ name: 'idx_sales_orders_channel', properties: ['channel', 'orderDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_orders_customer', properties: ['customer', 'orderDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_orders_location', properties: ['location', 'orderDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_orders_order_number', properties: ['org', 'orderNumber'] }),
    (0, core_1.Index)({ name: 'idx_sales_orders_salesperson', properties: ['salesperson', 'orderDate'] }),
    (0, core_1.Index)({ name: 'idx_sales_orders_status', properties: ['org', 'orderStatus', 'orderDate'] })
], SalesOrders);
var SalesOrdersOrderStatus;
(function (SalesOrdersOrderStatus) {
    SalesOrdersOrderStatus["DRAFT"] = "draft";
    SalesOrdersOrderStatus["CONFIRMED"] = "confirmed";
    SalesOrdersOrderStatus["PROCESSING"] = "processing";
    SalesOrdersOrderStatus["READY"] = "ready";
    SalesOrdersOrderStatus["DISPATCHED"] = "dispatched";
    SalesOrdersOrderStatus["DELIVERED"] = "delivered";
    SalesOrdersOrderStatus["COMPLETED"] = "completed";
    SalesOrdersOrderStatus["CANCELLED"] = "cancelled";
})(SalesOrdersOrderStatus || (exports.SalesOrdersOrderStatus = SalesOrdersOrderStatus = {}));
//# sourceMappingURL=SalesOrders.js.map