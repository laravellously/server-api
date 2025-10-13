import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Organizations } from './Organizations';
export declare class SalaryStructures {
    [PrimaryKeyProp]?: 'salaryStructureId';
    salaryStructureId: string & Opt;
    org: Organizations;
    employee: Employees;
    effectiveFrom: string;
    effectiveTo?: string;
    basicSalary: string;
    housingAllowance?: string;
    transportAllowance?: string;
    mealAllowance?: string;
    otherAllowances?: string;
    grossSalary?: string;
    currency: string & Opt;
    paymentFrequency: SalaryStructuresPaymentFrequency & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum SalaryStructuresPaymentFrequency {
    WEEKLY = "weekly",
    'BI-WEEKLY' = "bi-weekly",
    MONTHLY = "monthly",
    ANNUAL = "annual"
}
