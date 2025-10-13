import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class StatutoryDeductionConfigs {
    [PrimaryKeyProp]?: 'configId';
    configId: string & Opt;
    org: Organizations;
    deductionType: StatutoryDeductionConfigsDeductionType;
    deductionName: string;
    calculationMethod: StatutoryDeductionConfigsCalculationMethod;
    employeePercentage?: string;
    employerPercentage?: string;
    fixedAmount?: string;
    appliesTo?: StatutoryDeductionConfigsAppliesTo;
    minThreshold?: string;
    maxThreshold?: string;
    effectiveFrom: string;
    effectiveTo?: string;
    isActive: boolean & Opt;
    configDetails?: any;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum StatutoryDeductionConfigsDeductionType {
    PAYE = "PAYE",
    PENSION = "PENSION",
    NHF = "NHF",
    NHIS = "NHIS",
    ITF = "ITF",
    NSITF = "NSITF",
    OTHER = "OTHER"
}
export declare enum StatutoryDeductionConfigsCalculationMethod {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED",
    TIERED = "TIERED"
}
export declare enum StatutoryDeductionConfigsAppliesTo {
    BASIC = "BASIC",
    GROSS = "GROSS",
    TOTAL = "TOTAL"
}
