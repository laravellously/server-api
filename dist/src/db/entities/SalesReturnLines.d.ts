import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Products } from './Products';
import { SalesReturns } from './SalesReturns';
import { Warehouses } from './Warehouses';
export declare class SalesReturnLines {
    [PrimaryKeyProp]?: 'returnLineId';
    returnLineId: string & Opt;
    return: SalesReturns;
    lineNumber: number;
    product: Products;
    quantity: string;
    unitPrice: string;
    lineTotal?: string;
    warehouse?: Warehouses;
    restocked: boolean & Opt;
    createdAt: Date & Opt;
}
