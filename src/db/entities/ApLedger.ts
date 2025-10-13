import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Suppliers } from './Suppliers';

@Entity({ schema: 'accounting', comment: 'Accounts payable sub-ledger tracking supplier balances' })
@Index({ name: 'idx_ap_ledger_org_supplier', properties: ['org', 'supplier', 'transactionDate'] })
export class ApLedger {

  [PrimaryKeyProp]?: 'apLedgerId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  apLedgerId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Suppliers, fieldName: 'supplier_id', deleteRule: 'cascade' })
  supplier!: Suppliers;

  @Index({ name: 'idx_ap_ledger_bill', expression: 'CREATE INDEX idx_ap_ledger_bill ON accounting.ap_ledger USING btree (bill_id) WHERE (bill_id IS NOT NULL)' })
  @Property({ type: 'uuid', nullable: true })
  billId?: string;

  @Property({ type: 'uuid', nullable: true })
  paymentId?: string;

  @Property()
  transactionDate!: Date;

  @Enum({ items: () => ApLedgerTransactionType })
  transactionType!: ApLedgerTransactionType;

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

export enum ApLedgerTransactionType {
  BILL = 'BILL',
  PAYMENT = 'PAYMENT',
  DEBIT_NOTE = 'DEBIT_NOTE',
  ADJUSTMENT = 'ADJUSTMENT',
}
