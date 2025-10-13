import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Nigerian statutory deductions: PAYE, Pension (18%), NHF (2.5%), etc.' })
@Index({ name: 'idx_statutory_deduction_configs_effective', properties: ['org', 'effectiveFrom'] })
@Index({ name: 'idx_statutory_deduction_configs_org', properties: ['org', 'isActive'] })
@Unique({ name: 'statutory_deduction_configs_org_id_deduction_type_effective_key', properties: ['org', 'deductionType', 'effectiveFrom'] })
export class StatutoryDeductionConfigs {

  [PrimaryKeyProp]?: 'configId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  configId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Enum({ items: () => StatutoryDeductionConfigsDeductionType })
  deductionType!: StatutoryDeductionConfigsDeductionType;

  @Property({ length: 100 })
  deductionName!: string;

  @Enum({ items: () => StatutoryDeductionConfigsCalculationMethod })
  calculationMethod!: StatutoryDeductionConfigsCalculationMethod;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` })
  employeePercentage?: string;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` })
  employerPercentage?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  fixedAmount?: string;

  @Enum({ items: () => StatutoryDeductionConfigsAppliesTo, nullable: true })
  appliesTo?: StatutoryDeductionConfigsAppliesTo;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  minThreshold?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  maxThreshold?: string;

  @Property({ type: 'date' })
  effectiveFrom!: string;

  @Property({ type: 'date', nullable: true })
  effectiveTo?: string;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'json', nullable: true, comment: 'JSON configuration for tiered calculations like PAYE tax bands' })
  configDetails?: any;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum StatutoryDeductionConfigsDeductionType {
  PAYE = 'PAYE',
  PENSION = 'PENSION',
  NHF = 'NHF',
  NHIS = 'NHIS',
  ITF = 'ITF',
  NSITF = 'NSITF',
  OTHER = 'OTHER',
}

export enum StatutoryDeductionConfigsCalculationMethod {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  TIERED = 'TIERED',
}

export enum StatutoryDeductionConfigsAppliesTo {
  BASIC = 'BASIC',
  GROSS = 'GROSS',
  TOTAL = 'TOTAL',
}
