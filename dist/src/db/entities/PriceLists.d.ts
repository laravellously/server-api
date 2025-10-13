import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class PriceLists {
    [PrimaryKeyProp]?: 'priceListId';
    priceListId: string & Opt;
    org: Organizations;
    priceListCode: string;
    priceListName: string;
    description?: string;
    currency: string & Opt;
    isDefault: boolean & Opt;
    effectiveFrom: string;
    effectiveTo?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
