import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
export declare class Currencies {
    [PrimaryKeyProp]?: 'currencyCode';
    currencyCode: string;
    currencyName: string;
    symbol?: string;
    decimalPlaces: number & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
