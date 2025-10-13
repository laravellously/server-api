import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { PaymentMethods } from './PaymentMethods';

@Entity({ schema: 'sales', comment: 'Customer payments linked to invoices, partitioned by payment date' })
@Index({ name: 'idx_payments_customer', properties: ['customer', 'paymentDate'] })
@Index({ name: 'idx_payments_location', properties: ['location', 'paymentDate'] })
@Index({ name: 'idx_payments_payment_number', properties: ['org', 'paymentNumber'] })
export class Payments {

  [PrimaryKeyProp]?: ['paymentId', 'org', 'paymentDate'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  paymentId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade' })
  location!: Locations;

  @Property({ length: 50 })
  paymentNumber!: string;

  @PrimaryKey({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  paymentDate!: Date & Opt;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id' })
  customer!: Customers;

  @ManyToOne({ entity: () => PaymentMethods, fieldName: 'payment_method_id' })
  paymentMethod!: PaymentMethods;

  @Index({ name: 'idx_payments_invoice', expression: 'CREATE INDEX idx_payments_invoice ON ONLY sales.payments USING btree (invoice_id) WHERE (invoice_id IS NOT NULL)' })
  @Property({ type: 'uuid', nullable: true })
  invoiceId?: string;

  @Index({ name: 'idx_payments_reference', expression: 'CREATE INDEX idx_payments_reference ON ONLY sales.payments USING btree (reference_number) WHERE (reference_number IS NOT NULL)' })
  @Property({ length: 100, nullable: true })
  referenceNumber?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` })
  exchangeRate?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  amount!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(amount * exchange_rate) stored', nullable: true })
  amountBaseCurrency?: string;

  @Enum({ items: () => PaymentsPaymentStatus })
  paymentStatus: PaymentsPaymentStatus & Opt = PaymentsPaymentStatus.COMPLETED;

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

export enum PaymentsPaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}
