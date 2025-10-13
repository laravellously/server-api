import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'crm' })
@Unique({ name: 'lead_sources_org_id_source_code_key', properties: ['org', 'sourceCode'] })
export class LeadSources {

  [PrimaryKeyProp]?: 'sourceId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  sourceId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_lead_sources_org' })
  org!: Organizations;

  @Property({ length: 50 })
  sourceCode!: string;

  @Property({ length: 100 })
  sourceName!: string;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
