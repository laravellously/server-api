import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { ChartOfAccounts } from './ChartOfAccounts';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Bank accounts linked to chart of accounts for reconciliation' })
@Unique({ name: 'bank_accounts_org_id_account_number_bank_name_key', properties: ['org', 'accountNumber', 'bankName'] })
export class BankAccounts {

  [PrimaryKeyProp]?: 'bankAccountId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  bankAccountId!: string & Opt;

  @Index({ name: 'idx_bank_accounts_org', expression: 'CREATE INDEX idx_bank_accounts_org ON accounting.bank_accounts USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => ChartOfAccounts, fieldName: 'account_id', index: 'idx_bank_accounts_coa' })
  account!: ChartOfAccounts;

  @Property()
  bankName!: string;

  @Property({ length: 50 })
  accountNumber!: string;

  @Property({ nullable: true })
  accountHolder?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ nullable: true })
  branch?: string;

  @Property({ length: 20, nullable: true })
  swiftCode?: string;

  @Property({ length: 50, nullable: true })
  iban?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  currentBalance!: string & Opt;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
