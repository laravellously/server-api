import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { ChartOfAccounts } from './ChartOfAccounts';
import { Organizations } from './Organizations';
export declare class BankAccounts {
    [PrimaryKeyProp]?: 'bankAccountId';
    bankAccountId: string & Opt;
    org: Organizations;
    account: ChartOfAccounts;
    bankName: string;
    accountNumber: string;
    accountHolder?: string;
    currency: string & Opt;
    branch?: string;
    swiftCode?: string;
    iban?: string;
    currentBalance: string & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
