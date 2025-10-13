import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'accounting', comment: 'Fiscal periods for accounting period closing and reporting' })
@Index({ name: 'idx_fiscal_periods_dates', properties: ['org', 'startDate', 'endDate'] })
@Index({ name: 'idx_fiscal_periods_org', properties: ['org', 'fiscalYear', 'periodNumber'] })
@Unique({ name: 'fiscal_periods_org_id_fiscal_year_period_number_key', properties: ['org', 'fiscalYear', 'periodNumber'] })
export class FiscalPeriods {

  [PrimaryKeyProp]?: 'periodId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  periodId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 20 })
  periodCode!: string;

  @Property({ length: 100 })
  periodName!: string;

  @Property()
  fiscalYear!: number;

  @Property()
  periodNumber!: number;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date' })
  endDate!: string;

  @Enum({ items: () => FiscalPeriodsStatus })
  status: FiscalPeriodsStatus & Opt = FiscalPeriodsStatus.OPEN;

  @Property({ nullable: true })
  closedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  closedBy?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}

export enum FiscalPeriodsStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  LOCKED = 'locked',
}
