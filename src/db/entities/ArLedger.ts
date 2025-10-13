import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Accounts receivable sub-ledger tracking customer balances' })
@Index({ name: 'idx_ar_ledger_org_customer', properties: ['org', 'customer', 'transactionDate'] })
export class ArLedger {

  [PrimaryKeyProp]?: 'arLedgerId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  arLedgerId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id', deleteRule: 'cascade' })
  customer!: Customers;

  @Index({ name: 'idx_ar_ledger_invoice', expression: 'CREATE INDEX idx_ar_ledger_invoice ON accounting.ar_ledger USING btree (invoice_id) WHERE (invoice_id IS NOT NULL)' })
  @Property({ type: 'uuid', nullable: true })
  invoiceId?: string;

  @Index({ name: 'idx_ar_ledger_payment', expression: 'CREATE INDEX idx_ar_ledger_payment ON accounting.ar_ledger USING btree (payment_id) WHERE (payment_id IS NOT NULL)' })
  @Property({ type: 'uuid', nullable: true })
  paymentId?: string;

  @Property()
  transactionDate!: Date;

  @Enum({ items: () => ArLedgerTransactionType })
  transactionType!: ArLedgerTransactionType;

  @Property({ length: 50, nullable: true })
  referenceNumber?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  debitAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  creditAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  balance?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum ArLedgerTransactionType {
  INVOICE = 'INVOICE',
  PAYMENT = 'PAYMENT',
  CREDIT_NOTE = 'CREDIT_NOTE',
  ADJUSTMENT = 'ADJUSTMENT',
}
