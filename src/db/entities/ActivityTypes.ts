import { Entity, Enum, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'crm', comment: 'Activity types for customer interactions (calls, emails, meetings, WhatsApp)' })
@Unique({ name: 'activity_types_org_id_type_code_key', properties: ['org', 'typeCode'] })
export class ActivityTypes {

  [PrimaryKeyProp]?: 'activityTypeId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  activityTypeId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_activity_types_org' })
  org!: Organizations;

  @Property({ length: 50 })
  typeCode!: string;

  @Property({ length: 100 })
  typeName!: string;

  @Enum({ items: () => ActivityTypesCategory })
  category!: ActivityTypesCategory;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}

export enum ActivityTypesCategory {
  CALL = 'CALL',
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  TASK = 'TASK',
  NOTE = 'NOTE',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}
