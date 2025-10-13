import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { AccountTypes } from './AccountTypes';
import { Organizations } from './Organizations';
export declare class ChartOfAccounts {
    [PrimaryKeyProp]?: 'accountId';
    accountId: string & Opt;
    org: Organizations;
    accountCode: string;
    accountName: string;
    accountType: AccountTypes;
    parent?: ChartOfAccounts;
    currency: string & Opt;
    isControlAccount: boolean & Opt;
    isHeader: boolean & Opt;
    isActive: boolean & Opt;
    openingBalance: string & Opt;
    currentBalance: string & Opt;
    description?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
