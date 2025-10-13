import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Invoices } from './Invoices';
import { Products } from './Products';
import { TaxConfigs } from './TaxConfigs';

@Entity({ schema: 'sales' })
@Index({ name: 'idx_invoice_lines_invoice', expression: 'create index "idx_invoice_lines_invoice" on "invoice_lines" ("org_id", "invoice_id")' })
@Unique({ name: 'invoice_lines_org_id_invoice_id_line_number_key', expression: 'create unique index "invoice_lines_org_id_invoice_id_line_number_key" on "invoice_lines" ("org_id", "invoice_id", "line_number")' })
export class InvoiceLines {

  [PrimaryKeyProp]?: 'invoiceLineId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  invoiceLineId!: string & Opt;

  @Property()
  lineNumber!: number;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', nullable: true, index: 'idx_invoice_lines_product' })
  product?: Products;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  quantity!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  unitPrice!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  discountAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '((quantity * unit_price) - discount_amount) stored', nullable: true })
  lineSubtotal?: string;

  @ManyToOne({ entity: () => TaxConfigs, fieldName: 'tax_config_id', nullable: true })
  taxConfig?: TaxConfigs;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  taxAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(((quantity * unit_price) - discount_amount) + tax_amount) stored', nullable: true })
  lineTotal?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @ManyToOne({ entity: () => Invoices, fieldNames: ['org_id', 'invoice_id', 'invoice_date'], deleteRule: 'cascade' })
  'sales.invoices'!: Invoices;
}
