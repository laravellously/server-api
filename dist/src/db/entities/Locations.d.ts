import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class Locations {
    [PrimaryKeyProp]?: 'locationId';
    locationId: string & Opt;
    org: Organizations;
    locationCode: string;
    locationName: string;
    locationType: LocationsLocationType;
    address?: string;
    city?: string;
    state?: string;
    country: string & Opt;
    latitude?: string;
    longitude?: string;
    phone?: string;
    email?: string;
    managerUserId?: string;
    isPrimary: boolean & Opt;
    status: LocationsStatus & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum LocationsLocationType {
    STORE = "store",
    WAREHOUSE = "warehouse",
    OFFICE = "office",
    FACTORY = "factory",
    SERVICE_CENTER = "service_center"
}
export declare enum LocationsStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    CLOSED = "closed"
}
