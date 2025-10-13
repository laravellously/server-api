import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { ChartOfAccounts } from './ChartOfAccounts';
import { JournalEntries } from './JournalEntries';
import { Locations } from './Locations';

@Entity({ schema: 'accounting', comment: 'Journal entry line items enforcing double-entry bookkeeping (debit/credit)' })
@Index({ name: 'idx_journal_entry_lines_account', expression: 'create index "idx_journal_entry_lines_account" on "journal_entry_lines" ("account_id", "entry_date")' })
@Index({ name: 'idx_journal_entry_lines_entry', expression: 'create index "idx_journal_entry_lines_entry" on "journal_entry_lines" ("org_id", "entry_id")' })
@Unique({ name: 'journal_entry_lines_org_id_entry_id_line_number_key', expression: 'create unique index "journal_entry_lines_org_id_entry_id_line_number_key" on "journal_entry_lines" ("org_id", "entry_id", "line_number")' })
export class JournalEntryLines {

  [PrimaryKeyProp]?: 'lineId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  lineId!: string & Opt;

  @Property()
  lineNumber!: number;

  @ManyToOne({ entity: () => ChartOfAccounts, fieldName: 'account_id' })
  account!: ChartOfAccounts;

  @Index({ name: 'idx_journal_entry_lines_location', expression: 'CREATE INDEX idx_journal_entry_lines_location ON accounting.journal_entry_lines USING btree (location_id) WHERE (location_id IS NOT NULL)' })
  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  debitAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  creditAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: 'debit_amount stored', nullable: true })
  debitBaseCurrency?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: 'credit_amount stored', nullable: true })
  creditBaseCurrency?: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @ManyToOne({ entity: () => JournalEntries, fieldNames: ['org_id', 'entry_id', 'entry_date'], deleteRule: 'cascade' })
  'accounting.journalEntries'!: JournalEntries;
}
