import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class Brands {
    [PrimaryKeyProp]?: 'brandId';
    brandId: string & Opt;
    org: Organizations;
    brandCode: string;
    brandName: string;
    description?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
