import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Performance appraisal cycles/periods' })
@Index({ name: 'idx_appraisal_cycles_org', properties: ['org', 'startDate'] })
@Unique({ name: 'appraisal_cycles_org_id_cycle_name_key', properties: ['org', 'cycleName'] })
export class AppraisalCycles {

  [PrimaryKeyProp]?: 'cycleId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  cycleId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 100 })
  cycleName!: string;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date' })
  endDate!: string;

  @Enum({ items: () => AppraisalCyclesStatus })
  status: AppraisalCyclesStatus & Opt = AppraisalCyclesStatus.DRAFT;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum AppraisalCyclesStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
