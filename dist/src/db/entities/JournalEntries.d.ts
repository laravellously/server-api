import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { FiscalPeriods } from './FiscalPeriods';
import { JournalBatches } from './JournalBatches';
import { Organizations } from './Organizations';
export declare class JournalEntries {
    [PrimaryKeyProp]?: ['entryId', 'org', 'entryDate'];
    entryId: string & Opt;
    org: Organizations;
    entryNumber: string;
    entryDate: Date & Opt;
    postingDate: string;
    batch?: JournalBatches;
    period: FiscalPeriods;
    entryType: JournalEntriesEntryType;
    referenceType?: string;
    referenceId?: string;
    description: string;
    currency: string & Opt;
    exchangeRate?: string;
    status: JournalEntriesStatus & Opt;
    postedAt?: Date;
    postedBy?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum JournalEntriesEntryType {
    MANUAL = "MANUAL",
    SALES = "SALES",
    PURCHASE = "PURCHASE",
    PAYMENT = "PAYMENT",
    RECEIPT = "RECEIPT",
    ADJUSTMENT = "ADJUSTMENT",
    DEPRECIATION = "DEPRECIATION",
    ACCRUAL = "ACCRUAL",
    PAYROLL = "PAYROLL",
    TAX = "TAX"
}
export declare enum JournalEntriesStatus {
    DRAFT = "draft",
    POSTED = "posted",
    VOID = "void"
}
