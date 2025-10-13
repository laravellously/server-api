import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Employees } from './Employees';
import { LeaveTypes } from './LeaveTypes';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'hrm', comment: 'Employee leave requests with approval workflow' })
@Index({ name: 'idx_leave_applications_dates', properties: ['org', 'startDate', 'endDate'] })
@Index({ name: 'idx_leave_applications_employee', properties: ['employee', 'applicationDate'] })
@Index({ name: 'idx_leave_applications_org', properties: ['org', 'applicationDate'] })
@Index({ name: 'idx_leave_applications_status', properties: ['org', 'status'] })
export class LeaveApplications {

  [PrimaryKeyProp]?: 'applicationId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  applicationId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @ManyToOne({ entity: () => LeaveTypes, fieldName: 'leave_type_id' })
  leaveType!: LeaveTypes;

  @Property({ type: 'date', defaultRaw: `CURRENT_DATE` })
  applicationDate!: string & Opt;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date' })
  endDate!: string;

  @Property({ type: 'decimal', precision: 5, scale: 2 })
  totalDays!: string;

  @Property({ type: 'text', nullable: true })
  reason?: string;

  @Enum({ items: () => LeaveApplicationsStatus })
  status: LeaveApplicationsStatus & Opt = LeaveApplicationsStatus.PENDING;

  @ManyToOne({ entity: () => Users, fieldName: 'approved_by', nullable: true })
  approvedBy?: Users;

  @Property({ nullable: true })
  approvedAt?: Date;

  @Property({ type: 'text', nullable: true })
  rejectionReason?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum LeaveApplicationsStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}
