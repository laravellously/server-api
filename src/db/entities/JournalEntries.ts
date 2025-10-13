import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { FiscalPeriods } from './FiscalPeriods';
import { JournalBatches } from './JournalBatches';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Journal entries (headers) partitioned by date for scalability' })
@Index({ name: 'idx_journal_entries_entry_number', properties: ['org', 'entryNumber'] })
@Index({ name: 'idx_journal_entries_posting_date', properties: ['org', 'postingDate'] })
@Index({ name: 'idx_journal_entries_reference', properties: ['referenceType', 'referenceId'] })
@Index({ name: 'idx_journal_entries_status', properties: ['org', 'status', 'entryDate'] })
export class JournalEntries {

  [PrimaryKeyProp]?: ['entryId', 'org', 'entryDate'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  entryId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true })
  org!: Organizations;

  @Property({ length: 50 })
  entryNumber!: string;

  @PrimaryKey({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  entryDate!: Date & Opt;

  @Property({ type: 'date' })
  postingDate!: string;

  @Index({ name: 'idx_journal_entries_batch', expression: 'CREATE INDEX idx_journal_entries_batch ON ONLY accounting.journal_entries USING btree (batch_id) WHERE (batch_id IS NOT NULL)' })
  @ManyToOne({ entity: () => JournalBatches, fieldName: 'batch_id', deleteRule: 'set null', nullable: true })
  batch?: JournalBatches;

  @ManyToOne({ entity: () => FiscalPeriods, fieldName: 'period_id', index: 'idx_journal_entries_period' })
  period!: FiscalPeriods;

  @Enum({ items: () => JournalEntriesEntryType })
  entryType!: JournalEntriesEntryType;

  @Property({ length: 50, nullable: true })
  referenceType?: string;

  @Property({ type: 'uuid', nullable: true })
  referenceId?: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` })
  exchangeRate?: string;

  @Enum({ items: () => JournalEntriesStatus })
  status: JournalEntriesStatus & Opt = JournalEntriesStatus.DRAFT;

  @Property({ nullable: true })
  postedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  postedBy?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum JournalEntriesEntryType {
  MANUAL = 'MANUAL',
  SALES = 'SALES',
  PURCHASE = 'PURCHASE',
  PAYMENT = 'PAYMENT',
  RECEIPT = 'RECEIPT',
  ADJUSTMENT = 'ADJUSTMENT',
  DEPRECIATION = 'DEPRECIATION',
  ACCRUAL = 'ACCRUAL',
  PAYROLL = 'PAYROLL',
  TAX = 'TAX',
}

export enum JournalEntriesStatus {
  DRAFT = 'draft',
  POSTED = 'posted',
  VOID = 'void',
}
