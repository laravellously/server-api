import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
export declare class Organizations {
    [PrimaryKeyProp]?: 'orgId';
    orgId: string & Opt;
    orgCode: string;
    orgName: string;
    legalName?: string;
    taxId?: string;
    vatRegistration?: string;
    baseCurrency: string & Opt;
    fiscalYearStart: number & Opt;
    timezone: string & Opt;
    address?: string;
    city?: string;
    state?: string;
    country: string & Opt;
    phone?: string;
    email?: string;
    website?: string;
    status: OrganizationsStatus & Opt;
    subscriptionTier?: string;
    subscriptionExpiresAt?: Date;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum OrganizationsStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    CLOSED = "closed"
}
