import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Leave types (annual, sick, maternity, etc.)' })
@Unique({ name: 'leave_types_org_id_type_code_key', properties: ['org', 'typeCode'] })
export class LeaveTypes {

  [PrimaryKeyProp]?: 'leaveTypeId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  leaveTypeId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_leave_types_org' })
  org!: Organizations;

  @Property({ length: 50 })
  typeCode!: string;

  @Property({ length: 100 })
  typeName!: string;

  @Property()
  defaultDays!: number;

  @Property({ type: 'boolean' })
  isPaid: boolean & Opt = true;

  @Property({ type: 'boolean' })
  requiresApproval: boolean & Opt = true;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
