import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { BankAccounts } from './BankAccounts';

@Entity({ schema: 'accounting', comment: 'Bank statement transactions for reconciliation' })
@Index({ name: 'idx_bank_transactions_account', properties: ['bankAccount', 'transactionDate'] })
@Index({ name: 'idx_bank_transactions_reconciled', properties: ['bankAccount', 'isReconciled'] })
export class BankTransactions {

  [PrimaryKeyProp]?: 'bankTransactionId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  bankTransactionId!: string & Opt;

  @ManyToOne({ entity: () => BankAccounts, fieldName: 'bank_account_id', deleteRule: 'cascade' })
  bankAccount!: BankAccounts;

  @Property({ type: 'date' })
  transactionDate!: string;

  @Property({ type: 'date', nullable: true })
  valueDate?: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ length: 100, nullable: true })
  reference?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  debitAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  creditAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  balance?: string;

  @Property({ type: 'boolean' })
  isReconciled: boolean & Opt = false;

  @Property({ type: 'uuid', nullable: true })
  reconciledEntryId?: string;

  @Property({ nullable: true })
  reconciledAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  reconciledBy?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
