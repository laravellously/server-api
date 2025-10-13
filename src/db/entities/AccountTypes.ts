import { Entity, Enum, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity({ schema: 'accounting', comment: 'Standard account types for chart of accounts classification' })
export class AccountTypes {

  [PrimaryKeyProp]?: 'accountTypeId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  accountTypeId!: string & Opt;

  @Property({ length: 20, unique: 'account_types_type_code_key' })
  typeCode!: string;

  @Property({ length: 100 })
  typeName!: string;

  @Enum({ items: () => AccountTypesCategory })
  category!: AccountTypesCategory;

  @Enum({ items: () => AccountTypesNormalBalance })
  normalBalance!: AccountTypesNormalBalance;

  @Property({ type: 'boolean' })
  isSystem: boolean & Opt = false;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}

export enum AccountTypesCategory {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export enum AccountTypesNormalBalance {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}
