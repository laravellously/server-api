import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { AccountTypes } from './AccountTypes';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Hierarchical chart of accounts per organization' })
@Index({ name: 'idx_coa_active', expression: 'CREATE INDEX idx_coa_active ON accounting.chart_of_accounts USING btree (org_id, is_active) WHERE (deleted_at IS NULL)', properties: ['org', 'isActive'] })
@Unique({ name: 'chart_of_accounts_org_id_account_code_key', properties: ['org', 'accountCode'] })
export class ChartOfAccounts {

  [PrimaryKeyProp]?: 'accountId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  accountId!: string & Opt;

  @Index({ name: 'idx_coa_org', expression: 'CREATE INDEX idx_coa_org ON accounting.chart_of_accounts USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  accountCode!: string;

  @Property()
  accountName!: string;

  @Index({ name: 'idx_coa_account_type', expression: 'CREATE INDEX idx_coa_account_type ON accounting.chart_of_accounts USING btree (account_type_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => AccountTypes, fieldName: 'account_type_id' })
  accountType!: AccountTypes;

  @Index({ name: 'idx_coa_parent', expression: 'CREATE INDEX idx_coa_parent ON accounting.chart_of_accounts USING btree (parent_account_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => ChartOfAccounts, nullable: true })
  parent?: ChartOfAccounts;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'boolean', comment: 'Control accounts (AR, AP, Inventory) link to sub-ledgers' })
  isControlAccount: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isHeader: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  openingBalance!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  currentBalance!: string & Opt;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}
