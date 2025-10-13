import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Brands } from './Brands';
import { Organizations } from './Organizations';
import { ProductCategories } from './ProductCategories';
import { TaxConfigs } from './TaxConfigs';
import { Uom } from './Uom';
export declare class Products {
    [PrimaryKeyProp]?: 'productId';
    productId: string & Opt;
    org: Organizations;
    sku: string;
    barcode?: string;
    productName: string;
    description?: string;
    category?: ProductCategories;
    brand?: Brands;
    uom: Uom;
    productType: ProductsProductType & Opt;
    isSerialized: boolean & Opt;
    isBatchTracked: boolean & Opt;
    hasExpiry: boolean & Opt;
    costMethod: ProductsCostMethod & Opt;
    standardCost: string & Opt;
    baseSellingPrice: string & Opt;
    reorderLevel?: string;
    reorderQuantity?: string;
    taxConfig?: TaxConfigs;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum ProductsProductType {
    STANDARD = "standard",
    SERVICE = "service",
    DIGITAL = "digital",
    BUNDLE = "bundle"
}
export declare enum ProductsCostMethod {
    FIFO = "FIFO",
    LIFO = "LIFO",
    WAC = "WAC"
}
