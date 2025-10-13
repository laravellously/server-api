import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Products } from './Products';
import { Warehouses } from './Warehouses';
export declare class StockBalances {
    [PrimaryKeyProp]?: 'stockBalanceId';
    stockBalanceId: string & Opt;
    org: Organizations;
    product: Products;
    warehouse: Warehouses;
    batchNumber?: string;
    serialNumber?: string;
    expiryDate?: string;
    quantityOnHand: string & Opt;
    quantityReserved: string & Opt;
    quantityAvailable?: string;
    averageCost: string & Opt;
    lastCost: string & Opt;
    updatedAt: Date & Opt;
}
