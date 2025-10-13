import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { AppraisalCycles } from './AppraisalCycles';
import { Employees } from './Employees';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'hrm', comment: 'Employee performance appraisals' })
@Index({ name: 'idx_appraisals_employee', properties: ['employee', 'appraisalDate'] })
@Unique({ name: 'appraisals_org_id_cycle_id_employee_id_key', properties: ['org', 'cycle', 'employee'] })
export class Appraisals {

  [PrimaryKeyProp]?: 'appraisalId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  appraisalId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_appraisals_org' })
  org!: Organizations;

  @ManyToOne({ entity: () => AppraisalCycles, fieldName: 'cycle_id', deleteRule: 'cascade', index: 'idx_appraisals_cycle' })
  cycle!: AppraisalCycles;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @ManyToOne({ entity: () => Users, fieldName: 'appraiser_id' })
  appraiser!: Users;

  @Property({ type: 'date' })
  appraisalDate!: string;

  @Property({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  overallRating?: string;

  @Property({ type: 'text', nullable: true })
  strengths?: string;

  @Property({ type: 'text', nullable: true })
  areasForImprovement?: string;

  @Property({ type: 'text', nullable: true })
  goalsNextPeriod?: string;

  @Property({ type: 'text', nullable: true })
  employeeComments?: string;

  @Enum({ items: () => AppraisalsStatus })
  status: AppraisalsStatus & Opt = AppraisalsStatus.DRAFT;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum AppraisalsStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  FINALIZED = 'finalized',
}
