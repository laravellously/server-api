import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Payroll processing periods' })
@Index({ name: 'idx_payroll_periods_org', properties: ['org', 'startDate'] })
@Index({ name: 'idx_payroll_periods_status', properties: ['org', 'status'] })
@Unique({ name: 'payroll_periods_org_id_period_code_key', properties: ['org', 'periodCode'] })
export class PayrollPeriods {

  [PrimaryKeyProp]?: 'periodId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  periodId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  periodCode!: string;

  @Property({ length: 100 })
  periodName!: string;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date' })
  endDate!: string;

  @Property({ type: 'date' })
  paymentDate!: string;

  @Enum({ items: () => PayrollPeriodsStatus })
  status: PayrollPeriodsStatus & Opt = PayrollPeriodsStatus.DRAFT;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  totalGross?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  totalDeductions?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  totalNet?: string;

  @Property({ nullable: true })
  processedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  processedBy?: string;

  @Property({ nullable: true })
  approvedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  approvedBy?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum PayrollPeriodsStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  PAID = 'paid',
  CLOSED = 'closed',
}
