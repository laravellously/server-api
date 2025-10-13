import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { PriceLists } from './PriceLists';
import { Products } from './Products';
export declare class PriceListItems {
    [PrimaryKeyProp]?: 'priceListItemId';
    priceListItemId: string & Opt;
    priceList: PriceLists;
    product: Products;
    unitPrice: string;
    minQuantity?: string;
    maxQuantity?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
