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
exports.PaymentsPaymentStatus = exports.Payments = void 0;
const core_1 = require("@mikro-orm/core");
const Customers_1 = require("./Customers");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
const PaymentMethods_1 = require("./PaymentMethods");
let Payments = class Payments {
    [core_1.PrimaryKeyProp];
    paymentId;
    org;
    location;
    paymentNumber;
    paymentDate;
    customer;
    paymentMethod;
    invoiceId;
    referenceNumber;
    currency = 'NGN';
    exchangeRate;
    amount;
    amountBaseCurrency;
    paymentStatus = PaymentsPaymentStatus.COMPLETED;
    notes;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
};
exports.Payments = Payments;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Payments.prototype, "paymentId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true }),
    __metadata("design:type", Organizations_1.Organizations)
], Payments.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade' }),
    __metadata("design:type", Locations_1.Locations)
], Payments.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Payments.prototype, "paymentNumber", void 0);
__decorate([
    (0, core_1.PrimaryKey)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Payments.prototype, "paymentDate", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Customers_1.Customers, fieldName: 'customer_id' }),
    __metadata("design:type", Customers_1.Customers)
], Payments.prototype, "customer", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => PaymentMethods_1.PaymentMethods, fieldName: 'payment_method_id' }),
    __metadata("design:type", PaymentMethods_1.PaymentMethods)
], Payments.prototype, "paymentMethod", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_payments_invoice', expression: 'CREATE INDEX idx_payments_invoice ON ONLY sales.payments USING btree (invoice_id) WHERE (invoice_id IS NOT NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Payments.prototype, "invoiceId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_payments_reference', expression: 'CREATE INDEX idx_payments_reference ON ONLY sales.payments USING btree (reference_number) WHERE (reference_number IS NOT NULL)' }),
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Payments.prototype, "referenceNumber", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3 }),
    __metadata("design:type", Object)
], Payments.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` }),
    __metadata("design:type", String)
], Payments.prototype, "exchangeRate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], Payments.prototype, "amount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(amount * exchange_rate) stored', nullable: true }),
    __metadata("design:type", String)
], Payments.prototype, "amountBaseCurrency", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PaymentsPaymentStatus }),
    __metadata("design:type", Object)
], Payments.prototype, "paymentStatus", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Payments.prototype, "notes", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Payments.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Payments.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    __metadata("design:type", String)
], Payments.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Payments.prototype, "updatedBy", void 0);
exports.Payments = Payments = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Customer payments linked to invoices, partitioned by payment date' }),
    (0, core_1.Index)({ name: 'idx_payments_customer', properties: ['customer', 'paymentDate'] }),
    (0, core_1.Index)({ name: 'idx_payments_location', properties: ['location', 'paymentDate'] }),
    (0, core_1.Index)({ name: 'idx_payments_payment_number', properties: ['org', 'paymentNumber'] })
], Payments);
var PaymentsPaymentStatus;
(function (PaymentsPaymentStatus) {
    PaymentsPaymentStatus["PENDING"] = "pending";
    PaymentsPaymentStatus["COMPLETED"] = "completed";
    PaymentsPaymentStatus["FAILED"] = "failed";
    PaymentsPaymentStatus["REVERSED"] = "reversed";
})(PaymentsPaymentStatus || (exports.PaymentsPaymentStatus = PaymentsPaymentStatus = {}));
//# sourceMappingURL=Payments.js.map