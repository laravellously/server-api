import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'sales', comment: 'Customer invoices with payment tracking, partitioned by invoice date' })
@Index({ name: 'idx_invoices_customer', properties: ['customer', 'invoiceDate'] })
@Index({ name: 'idx_invoices_due_date', expression: 'CREATE INDEX idx_invoices_due_date ON ONLY sales.invoices USING btree (org_id, due_date) WHERE ((invoice_status)::text = ANY ((ARRAY[\'sent\'::character varying, \'partial\'::character varying, \'overdue\'::character varying])::text[]))', properties: ['org', 'dueDate'] })
@Index({ name: 'idx_invoices_invoice_number', properties: ['org', 'invoiceNumber'] })
@Index({ name: 'idx_invoices_location', properties: ['location', 'invoiceDate'] })
@Index({ name: 'idx_invoices_status', properties: ['org', 'invoiceStatus', 'invoiceDate'] })
export class Invoices {

  [PrimaryKeyProp]?: ['invoiceId', 'org', 'invoiceDate'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  invoiceId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade' })
  location!: Locations;

  @Property({ length: 50 })
  invoiceNumber!: string;

  @PrimaryKey({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  invoiceDate!: Date & Opt;

  @Property({ type: 'date', nullable: true })
  dueDate?: string;

  @Property({ type: 'uuid', nullable: true })
  orderId?: string;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id' })
  customer!: Customers;

  @Enum({ items: () => InvoicesInvoiceStatus })
  invoiceStatus: InvoicesInvoiceStatus & Opt = InvoicesInvoiceStatus.DRAFT;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` })
  exchangeRate?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  subtotal!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  discountAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  taxAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  totalAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  paidAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(total_amount - paid_amount) stored', nullable: true })
  balanceDue?: string;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum InvoicesInvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  PARTIAL = 'partial',
  PAID = 'paid',
  OVERDUE = 'overdue',
  VOID = 'void',
  CANCELLED = 'cancelled',
}
