import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { PriceLists } from './PriceLists';
export declare class Customers {
    [PrimaryKeyProp]?: 'customerId';
    customerId: string & Opt;
    org: Organizations;
    customerCode: string;
    customerName: string;
    customerType: CustomersCustomerType & Opt;
    email?: string;
    phone?: string;
    mobile?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    taxId?: string;
    priceList?: PriceLists;
    paymentTerms?: string;
    creditLimit?: string;
    loyaltyPoints?: number;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum CustomersCustomerType {
    INDIVIDUAL = "individual",
    CORPORATE = "corporate"
}
