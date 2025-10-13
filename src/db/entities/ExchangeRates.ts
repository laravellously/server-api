import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Currencies } from './Currencies';
import { Organizations } from './Organizations';

@Entity({ schema: 'core', comment: 'Historical exchange rates for multi-currency transactions' })
@Index({ name: 'idx_exchange_rates_currencies', properties: ['fromCurrency', 'toCurrency', 'effectiveDate'] })
@Index({ name: 'idx_exchange_rates_org', properties: ['org', 'effectiveDate'] })
@Unique({ name: 'exchange_rates_org_id_from_currency_to_currency_effective_d_key', properties: ['org', 'fromCurrency', 'toCurrency', 'effectiveDate'] })
export class ExchangeRates {

  [PrimaryKeyProp]?: 'exchangeRateId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  exchangeRateId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Currencies, fieldName: 'from_currency' })
  fromCurrency!: Currencies;

  @ManyToOne({ entity: () => Currencies, fieldName: 'to_currency' })
  toCurrency!: Currencies;

  @Property({ type: 'decimal', precision: 18, scale: 6 })
  rate!: string;

  @Property({ type: 'date' })
  effectiveDate!: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
