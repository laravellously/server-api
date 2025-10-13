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
exports.Suppliers = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let Suppliers = class Suppliers {
    [core_1.PrimaryKeyProp];
    supplierId;
    org;
    supplierCode;
    supplierName;
    contactPerson;
    email;
    phone;
    address;
    city;
    state;
    country = 'NG';
    taxId;
    paymentTerms;
    creditLimit;
    currency = 'NGN';
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Suppliers = Suppliers;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Suppliers.prototype, "supplierId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_suppliers_org', expression: 'CREATE INDEX idx_suppliers_org ON inventory.suppliers USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Suppliers.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Suppliers.prototype, "supplierCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Suppliers.prototype, "supplierName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "contactPerson", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "country", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "taxId", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "paymentTerms", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], Suppliers.prototype, "creditLimit", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 3, nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Suppliers.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Suppliers.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Suppliers.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Suppliers.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Suppliers.prototype, "createdBy", void 0);
exports.Suppliers = Suppliers = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Supplier/vendor master for procurement' }),
    (0, core_1.Index)({ name: 'idx_suppliers_name', expression: 'CREATE INDEX idx_suppliers_name ON inventory.suppliers USING btree (org_id, supplier_name) WHERE (deleted_at IS NULL)', properties: ['org', 'supplierName'] }),
    (0, core_1.Unique)({ name: 'suppliers_org_id_supplier_code_key', properties: ['org', 'supplierCode'] })
], Suppliers);
//# sourceMappingURL=Suppliers.js.map