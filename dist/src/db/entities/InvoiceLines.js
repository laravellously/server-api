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
exports.InvoiceLines = void 0;
const core_1 = require("@mikro-orm/core");
const Invoices_1 = require("./Invoices");
const Products_1 = require("./Products");
const TaxConfigs_1 = require("./TaxConfigs");
let InvoiceLines = class InvoiceLines {
    [core_1.PrimaryKeyProp];
    invoiceLineId;
    lineNumber;
    product;
    description;
    quantity;
    unitPrice;
    discountAmount;
    lineSubtotal;
    taxConfig;
    taxAmount;
    lineTotal;
    createdAt;
    'sales.invoices';
};
exports.InvoiceLines = InvoiceLines;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], InvoiceLines.prototype, "invoiceLineId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], InvoiceLines.prototype, "lineNumber", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Products_1.Products, fieldName: 'product_id', nullable: true, index: 'idx_invoice_lines_product' }),
    __metadata("design:type", Products_1.Products)
], InvoiceLines.prototype, "product", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "quantity", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "unitPrice", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "discountAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '((quantity * unit_price) - discount_amount) stored', nullable: true }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "lineSubtotal", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => TaxConfigs_1.TaxConfigs, fieldName: 'tax_config_id', nullable: true }),
    __metadata("design:type", TaxConfigs_1.TaxConfigs)
], InvoiceLines.prototype, "taxConfig", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "taxAmount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 18, scale: 4, generated: '(((quantity * unit_price) - discount_amount) + tax_amount) stored', nullable: true }),
    __metadata("design:type", String)
], InvoiceLines.prototype, "lineTotal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], InvoiceLines.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Invoices_1.Invoices, fieldNames: ['org_id', 'invoice_id', 'invoice_date'], deleteRule: 'cascade' }),
    __metadata("design:type", Invoices_1.Invoices)
], InvoiceLines.prototype, "sales.invoices", void 0);
exports.InvoiceLines = InvoiceLines = __decorate([
    (0, core_1.Entity)({ schema: 'sales' }),
    (0, core_1.Index)({ name: 'idx_invoice_lines_invoice', expression: 'create index "idx_invoice_lines_invoice" on "invoice_lines" ("org_id", "invoice_id")' }),
    (0, core_1.Unique)({ name: 'invoice_lines_org_id_invoice_id_line_number_key', expression: 'create unique index "invoice_lines_org_id_invoice_id_line_number_key" on "invoice_lines" ("org_id", "invoice_id", "line_number")' })
], InvoiceLines);
//# sourceMappingURL=InvoiceLines.js.map