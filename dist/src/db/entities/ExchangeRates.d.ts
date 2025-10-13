import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Currencies } from './Currencies';
import { Organizations } from './Organizations';
export declare class ExchangeRates {
    [PrimaryKeyProp]?: 'exchangeRateId';
    exchangeRateId: string & Opt;
    org: Organizations;
    fromCurrency: Currencies;
    toCurrency: Currencies;
    rate: string;
    effectiveDate: string;
    createdAt: Date & Opt;
    createdBy?: string;
}
