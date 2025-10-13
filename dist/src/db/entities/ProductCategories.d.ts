import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class ProductCategories {
    [PrimaryKeyProp]?: 'categoryId';
    categoryId: string & Opt;
    org: Organizations;
    parent?: ProductCategories;
    categoryCode: string;
    categoryName: string;
    description?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
