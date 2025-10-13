import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
export declare class AccountTypes {
    [PrimaryKeyProp]?: 'accountTypeId';
    accountTypeId: string & Opt;
    typeCode: string;
    typeName: string;
    category: AccountTypesCategory;
    normalBalance: AccountTypesNormalBalance;
    isSystem: boolean & Opt;
    createdAt: Date & Opt;
}
export declare enum AccountTypesCategory {
    ASSET = "ASSET",
    LIABILITY = "LIABILITY",
    EQUITY = "EQUITY",
    REVENUE = "REVENUE",
    EXPENSE = "EXPENSE"
}
export declare enum AccountTypesNormalBalance {
    DEBIT = "DEBIT",
    CREDIT = "CREDIT"
}
