import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Organizations } from './Organizations';
import { PayrollPeriods } from './PayrollPeriods';

@Entity({ schema: 'hrm', comment: 'Employee payroll with Nigerian statutory deductions (PAYE, Pension, NHF), partitioned by period' })
@Index({ name: 'idx_payroll_entries_employee', properties: ['employee', 'periodStartDate'] })
@Index({ name: 'idx_payroll_entries_status', properties: ['org', 'paymentStatus'] })
export class PayrollEntries {

  [PrimaryKeyProp]?: ['payrollEntryId', 'org', 'periodStartDate'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  payrollEntryId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true })
  org!: Organizations;

  @ManyToOne({ entity: () => PayrollPeriods, fieldName: 'period_id', deleteRule: 'cascade', index: 'idx_payroll_entries_period' })
  period!: PayrollPeriods;

  @PrimaryKey({ type: 'date' })
  periodStartDate!: string;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @Property({ type: 'decimal', precision: 18, scale: 2 })
  basicSalary!: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  housingAllowance?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  transportAllowance?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  mealAllowance?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  otherAllowances?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  overtimePay?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  bonus?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, generated: '((((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) + overtime_pay) + bonus) stored', nullable: true })
  grossPay?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  payeDeduction?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  pensionEmployee?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  pensionEmployer?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  nhfDeduction?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  nhisDeduction?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  loanDeduction?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  otherDeductions?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, generated: '(((((paye_deduction + pension_employee) + nhf_deduction) + nhis_deduction) + loan_deduction) + other_deductions) stored', nullable: true })
  totalDeductions?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, generated: '(((((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) + overtime_pay) + bonus) - (((((paye_deduction + pension_employee) + nhf_deduction) + nhis_deduction) + loan_deduction) + other_deductions)) stored', nullable: true })
  netPay?: string;

  @Enum({ items: () => PayrollEntriesPaymentStatus })
  paymentStatus: PayrollEntriesPaymentStatus & Opt = PayrollEntriesPaymentStatus.PENDING;

  @Property({ nullable: true })
  paidAt?: Date;

  @Property({ length: 100, nullable: true })
  paymentReference?: string;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum PayrollEntriesPaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}
