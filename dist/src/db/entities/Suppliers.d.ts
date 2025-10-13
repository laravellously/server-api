import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class Suppliers {
    [PrimaryKeyProp]?: 'supplierId';
    supplierId: string & Opt;
    org: Organizations;
    supplierCode: string;
    supplierName: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    taxId?: string;
    paymentTerms?: string;
    creditLimit?: string;
    currency?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
