import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Organizations } from './Organizations';
export declare class Contacts {
    [PrimaryKeyProp]?: 'contactId';
    contactId: string & Opt;
    org: Organizations;
    customer: Customers;
    firstName: string;
    lastName: string;
    position?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    isPrimary: boolean & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
