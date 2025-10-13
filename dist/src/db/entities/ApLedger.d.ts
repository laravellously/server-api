import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Suppliers } from './Suppliers';
export declare class ApLedger {
    [PrimaryKeyProp]?: 'apLedgerId';
    apLedgerId: string & Opt;
    org: Organizations;
    supplier: Suppliers;
    billId?: string;
    paymentId?: string;
    transactionDate: Date;
    transactionType: ApLedgerTransactionType;
    referenceNumber?: string;
    debitAmount: string & Opt;
    creditAmount: string & Opt;
    balance?: string;
    currency: string & Opt;
    createdAt: Date & Opt;
    createdBy?: string;
}
export declare enum ApLedgerTransactionType {
    BILL = "BILL",
    PAYMENT = "PAYMENT",
    DEBIT_NOTE = "DEBIT_NOTE",
    ADJUSTMENT = "ADJUSTMENT"
}
