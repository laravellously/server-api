import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { ChartOfAccounts } from './ChartOfAccounts';
import { JournalEntries } from './JournalEntries';
import { Locations } from './Locations';
export declare class JournalEntryLines {
    [PrimaryKeyProp]?: 'lineId';
    lineId: string & Opt;
    lineNumber: number;
    account: ChartOfAccounts;
    location?: Locations;
    debitAmount: string & Opt;
    creditAmount: string & Opt;
    debitBaseCurrency?: string;
    creditBaseCurrency?: string;
    description?: string;
    createdAt: Date & Opt;
    'accounting.journalEntries': JournalEntries;
}
