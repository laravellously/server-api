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
exports.CustomersCustomerType = exports.Customers = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
const PriceLists_1 = require("./PriceLists");
let Customers = class Customers {
    [core_1.PrimaryKeyProp];
    customerId;
    org;
    customerCode;
    customerName;
    customerType = CustomersCustomerType.INDIVIDUAL;
    email;
    phone;
    mobile;
    address;
    city;
    state;
    country = 'NG';
    taxId;
    priceList;
    paymentTerms;
    creditLimit;
    loyaltyPoints = 0;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Customers = Customers;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Customers.prototype, "customerId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_customers_org', expression: 'CREATE INDEX idx_customers_org ON sales.customers USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Customers.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Customers.prototype, "customerCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Customers.prototype, "customerName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => CustomersCustomerType }),
    __metadata("design:type", Object)
], Customers.prototype, "customerType", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_customers_email', expression: 'CREATE INDEX idx_customers_email ON sales.customers USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' }),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "email", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_customers_phone', expression: 'CREATE INDEX idx_customers_phone ON sales.customers USING btree (phone) WHERE ((deleted_at IS NULL) AND (phone IS NOT NULL))' }),
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "mobile", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "country", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "taxId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => PriceLists_1.PriceLists, fieldName: 'price_list_id', nullable: true }),
    __metadata("design:type", PriceLists_1.PriceLists)
], Customers.prototype, "priceList", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "paymentTerms", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], Customers.prototype, "creditLimit", void 0);
__decorate([
    (0, core_1.Property)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Customers.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Customers.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Customers.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Customers.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Customers.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "updatedBy", void 0);
exports.Customers = Customers = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Customer master with credit limits, loyalty points, and pricing' }),
    (0, core_1.Index)({ name: 'idx_customers_name', expression: 'CREATE INDEX idx_customers_name ON sales.customers USING btree (org_id, customer_name) WHERE (deleted_at IS NULL)', properties: ['org', 'customerName'] }),
    (0, core_1.Unique)({ name: 'customers_org_id_customer_code_key', properties: ['org', 'customerCode'] })
], Customers);
var CustomersCustomerType;
(function (CustomersCustomerType) {
    CustomersCustomerType["INDIVIDUAL"] = "individual";
    CustomersCustomerType["CORPORATE"] = "corporate";
})(CustomersCustomerType || (exports.CustomersCustomerType = CustomersCustomerType = {}));
//# sourceMappingURL=Customers.js.map