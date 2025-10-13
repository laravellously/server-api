import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class Warehouses {
    [PrimaryKeyProp]?: 'warehouseId';
    warehouseId: string & Opt;
    org: Organizations;
    location: Locations;
    warehouseCode: string;
    warehouseName: string;
    warehouseType?: WarehousesWarehouseType;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
export declare enum WarehousesWarehouseType {
    MAIN = "main",
    TRANSIT = "transit",
    RETAIL = "retail",
    DAMAGED = "damaged",
    QUARANTINE = "quarantine"
}
