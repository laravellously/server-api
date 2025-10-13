import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { BankAccounts } from './BankAccounts';
export declare class BankTransactions {
    [PrimaryKeyProp]?: 'bankTransactionId';
    bankTransactionId: string & Opt;
    bankAccount: BankAccounts;
    transactionDate: string;
    valueDate?: string;
    description?: string;
    reference?: string;
    debitAmount?: string;
    creditAmount?: string;
    balance?: string;
    isReconciled: boolean & Opt;
    reconciledEntryId?: string;
    reconciledAt?: Date;
    reconciledBy?: string;
    createdAt: Date & Opt;
}
