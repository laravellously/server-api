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
exports.InvoicesInvoiceStatus = exports.Invoices = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let Invoices = class Invoices {
    [core_1.PrimaryKeyProp];
    invoiceId;
    org;
    location;
    invoiceNumber;
    invoiceDate;
    dueDate;
    orderId;
    customer;
    invoiceStatus = InvoicesInvoiceStatus.DRAFT;
    currency = 'NGN';
    exchangeRate;
    subtotal;
    discountAmount;
    taxAmount;
    totalAmount;
    paidAmount;
    balanceDue;
    notes;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.Invoices = Invoices;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Invoices.prototype, "invoiceId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true }),
    __metadata("design:type", Organizations_1.Organizations)
], Invoices.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade' }),
    __metadata("design:type", Locations_1.Locations)
], Invoices.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Invoices.prototype, "invoiceNumber", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Invoices.prototype, "invoiceDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Invoices.prototype, "dueDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Invoices.prototype, "orderId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id' }),
    __metadata("design:type", Customers_1.Customers)
], Invoices.prototype, "customer", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => InvoicesInvoiceStatus }),
    __metadata("design:type", Object)
], Invoices.prototype, "invoiceStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], Invoices.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` }),
    __metadata("design:type", String)
], Invoices.prototype, "exchangeRate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Invoices.prototype, "subtotal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Invoices.prototype, "discountAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Invoices.prototype, "taxAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Invoices.prototype, "totalAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` }),
    __metadata("design:type", Object)
], Invoices.prototype, "paidAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(total_amount - paid_amount) stored', nullable: true }),
    __metadata("design:type", String)
], Invoices.prototype, "balanceDue", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Invoices.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Invoices.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Invoices.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], Invoices.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Invoices.prototype, "updatedBy", void 0);
exports.Invoices = Invoices = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Customer invoices with payment tracking, partitioned by invoice date' }),
    (0, core_1.Index)({ name: 'idx_invoices_customer', properties: ['customer', 'invoiceDate'] }),
    (0, core_1.Index)({ name: 'idx_invoices_due_date', expression: 'CREATE INDEX idx_invoices_due_date ON ONLY sales.invoices USING btree (org_id, due_date) WHERE ((invoice_status)::text = ANY ((ARRAY[\'sent\'::character varying, \'partial\'::character varying, \'overdue\'::character varying])::text[]))', properties: ['org', 'dueDate'] }),
    (0, core_1.Index)({ name: 'idx_invoices_invoice_number', properties: ['org', 'invoiceNumber'] }),
    (0, core_1.Index)({ name: 'idx_invoices_location', properties: ['location', 'invoiceDate'] }),
    (0, core_1.Index)({ name: 'idx_invoices_status', properties: ['org', 'invoiceStatus', 'invoiceDate'] })
], Invoices);
var InvoicesInvoiceStatus;
(function (InvoicesInvoiceStatus) {
    InvoicesInvoiceStatus["DRAFT"] = "draft";
    InvoicesInvoiceStatus["SENT"] = "sent";
    InvoicesInvoiceStatus["VIEWED"] = "viewed";
    InvoicesInvoiceStatus["PARTIAL"] = "partial";
    InvoicesInvoiceStatus["PAID"] = "paid";
    InvoicesInvoiceStatus["OVERDUE"] = "overdue";
    InvoicesInvoiceStatus["VOID"] = "void";
    InvoicesInvoiceStatus["CANCELLED"] = "cancelled";
})(InvoicesInvoiceStatus || (exports.InvoicesInvoiceStatus = InvoicesInvoiceStatus = {}));
//# sourceMappingURL=Invoices.js.map