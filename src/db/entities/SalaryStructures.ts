import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Employee salary structures with allowances' })
@Index({ name: 'idx_salary_structures_active', properties: ['org', 'isActive', 'effectiveFrom'] })
@Index({ name: 'idx_salary_structures_employee', properties: ['employee', 'effectiveFrom'] })
export class SalaryStructures {

  [PrimaryKeyProp]?: 'salaryStructureId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  salaryStructureId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_salary_structures_org' })
  org!: Organizations;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @Property({ type: 'date' })
  effectiveFrom!: string;

  @Property({ type: 'date', nullable: true })
  effectiveTo?: string;

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

  @Property({ type: 'decimal', precision: 18, scale: 2, generated: '((((basic_salary + housing_allowance) + transport_allowance) + meal_allowance) + other_allowances) stored', nullable: true })
  grossSalary?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Enum({ items: () => SalaryStructuresPaymentFrequency })
  paymentFrequency: SalaryStructuresPaymentFrequency & Opt = SalaryStructuresPaymentFrequency.MONTHLY;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum SalaryStructuresPaymentFrequency {
  WEEKLY = 'weekly',
  'BI-WEEKLY' = 'bi-weekly',
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}
