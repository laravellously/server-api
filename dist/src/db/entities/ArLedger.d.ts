import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Organizations } from './Organizations';
export declare class ArLedger {
    [PrimaryKeyProp]?: 'arLedgerId';
    arLedgerId: string & Opt;
    org: Organizations;
    customer: Customers;
    invoiceId?: string;
    paymentId?: string;
    transactionDate: Date;
    transactionType: ArLedgerTransactionType;
    referenceNumber?: string;
    debitAmount: string & Opt;
    creditAmount: string & Opt;
    balance?: string;
    currency: string & Opt;
    createdAt: Date & Opt;
    createdBy?: string;
}
export declare enum ArLedgerTransactionType {
    INVOICE = "INVOICE",
    PAYMENT = "PAYMENT",
    CREDIT_NOTE = "CREDIT_NOTE",
    ADJUSTMENT = "ADJUSTMENT"
}
