import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'crm' })
@Index({ name: 'idx_lead_statuses_org', properties: ['org', 'statusOrder'] })
@Unique({ name: 'lead_statuses_org_id_status_code_key', properties: ['org', 'statusCode'] })
export class LeadStatuses {

  [PrimaryKeyProp]?: 'statusId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  statusId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  statusCode!: string;

  @Property({ length: 100 })
  statusName!: string;

  @Property()
  statusOrder!: number;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
