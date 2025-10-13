import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'crm', comment: 'Sales pipeline stages with win probability' })
@Index({ name: 'idx_opportunity_stages_org', properties: ['org', 'stageOrder'] })
@Unique({ name: 'opportunity_stages_org_id_stage_code_key', properties: ['org', 'stageCode'] })
export class OpportunityStages {

  [PrimaryKeyProp]?: 'stageId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  stageId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  stageCode!: string;

  @Property({ length: 100 })
  stageName!: string;

  @Property()
  stageOrder!: number;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  probability?: string;

  @Property({ type: 'boolean' })
  isClosed: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isWon: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
