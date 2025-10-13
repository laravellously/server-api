import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Journal entry batches for grouping related transactions' })
@Index({ name: 'idx_journal_batches_org', properties: ['org', 'batchDate'] })
@Index({ name: 'idx_journal_batches_status', properties: ['org', 'status'] })
@Unique({ name: 'journal_batches_org_id_batch_number_key', properties: ['org', 'batchNumber'] })
export class JournalBatches {

  [PrimaryKeyProp]?: 'batchId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  batchId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  batchNumber!: string;

  @Property({ type: 'date' })
  batchDate!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Enum({ items: () => JournalBatchesStatus })
  status: JournalBatchesStatus & Opt = JournalBatchesStatus.DRAFT;

  @Property({ nullable: true })
  postedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  postedBy?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

}

export enum JournalBatchesStatus {
  DRAFT = 'draft',
  POSTED = 'posted',
  VOID = 'void',
}
