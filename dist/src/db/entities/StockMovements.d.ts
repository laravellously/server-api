import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Products } from './Products';
import { Warehouses } from './Warehouses';
export declare class StockMovements {
    [PrimaryKeyProp]?: 'movementId';
    movementId: string & Opt;
    org: Organizations;
    product: Products;
    warehouse: Warehouses;
    movementType: StockMovementsMovementType;
    movementDate: Date & Opt;
    batchNumber?: string;
    serialNumber?: string;
    quantity: string;
    unitCost: string & Opt;
    totalCost?: string;
    referenceType?: string;
    referenceId?: string;
    notes?: string;
    createdAt: Date & Opt;
    createdBy: string;
}
export declare enum StockMovementsMovementType {
    RECEIPT = "RECEIPT",
    ISSUE = "ISSUE",
    TRANSFER_OUT = "TRANSFER_OUT",
    TRANSFER_IN = "TRANSFER_IN",
    ADJUSTMENT = "ADJUSTMENT",
    RETURN = "RETURN",
    SALE = "SALE",
    PURCHASE = "PURCHASE",
    WRITE_OFF = "WRITE_OFF"
}
