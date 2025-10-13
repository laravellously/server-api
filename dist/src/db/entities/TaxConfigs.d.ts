import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class TaxConfigs {
    [PrimaryKeyProp]?: 'taxConfigId';
    taxConfigId: string & Opt;
    org: Organizations;
    taxType: TaxConfigsTaxType;
    taxName: string;
    taxRate: string;
    isInclusive: boolean & Opt;
    appliesTo?: string;
    effectiveFrom: string;
    effectiveTo?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum TaxConfigsTaxType {
    VAT = "VAT",
    WHT = "WHT",
    EXCISE = "EXCISE",
    IMPORT_DUTY = "IMPORT_DUTY",
    OTHER = "OTHER"
}
