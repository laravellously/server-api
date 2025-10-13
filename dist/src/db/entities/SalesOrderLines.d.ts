import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Products } from './Products';
import { SalesOrders } from './SalesOrders';
import { TaxConfigs } from './TaxConfigs';
import { Warehouses } from './Warehouses';
export declare class SalesOrderLines {
    [PrimaryKeyProp]?: 'orderLineId';
    orderLineId: string & Opt;
    lineNumber: number;
    product: Products;
    warehouse: Warehouses;
    batchNumber?: string;
    serialNumber?: string;
    quantity: string;
    unitPrice: string;
    discountPercent?: string;
    discountAmount?: string;
    lineSubtotal?: string;
    taxConfig?: TaxConfigs;
    taxAmount?: string;
    lineTotal?: string;
    quantityFulfilled: string & Opt;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    'sales.salesOrders': SalesOrders;
}
