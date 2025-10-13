import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Employees } from './Employees';
import { LeaveTypes } from './LeaveTypes';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Annual leave entitlements per employee' })
@Index({ name: 'idx_leave_entitlements_employee', properties: ['employee', 'year'] })
@Unique({ name: 'leave_entitlements_org_id_employee_id_leave_type_id_year_key', properties: ['org', 'employee', 'leaveType', 'year'] })
export class LeaveEntitlements {

  [PrimaryKeyProp]?: 'entitlementId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  entitlementId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @ManyToOne({ entity: () => LeaveTypes, fieldName: 'leave_type_id', deleteRule: 'cascade' })
  leaveType!: LeaveTypes;

  @Property()
  year!: number;

  @Property({ type: 'decimal', precision: 5, scale: 2 })
  allocatedDays!: string;

  @Property({ type: 'decimal', precision: 5, scale: 2, defaultRaw: `0` })
  usedDays!: string & Opt;

  @Property({ type: 'decimal', precision: 5, scale: 2, generated: '(allocated_days - used_days) stored', nullable: true })
  remainingDays?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

}
