import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Organizations } from './Organizations';
import { PayrollPeriods } from './PayrollPeriods';
export declare class PayrollEntries {
    [PrimaryKeyProp]?: ['payrollEntryId', 'org', 'periodStartDate'];
    payrollEntryId: string & Opt;
    org: Organizations;
    period: PayrollPeriods;
    periodStartDate: string;
    employee: Employees;
    basicSalary: string;
    housingAllowance?: string;
    transportAllowance?: string;
    mealAllowance?: string;
    otherAllowances?: string;
    overtimePay?: string;
    bonus?: string;
    grossPay?: string;
    payeDeduction?: string;
    pensionEmployee?: string;
    pensionEmployer?: string;
    nhfDeduction?: string;
    nhisDeduction?: string;
    loanDeduction?: string;
    otherDeductions?: string;
    totalDeductions?: string;
    netPay?: string;
    paymentStatus: PayrollEntriesPaymentStatus & Opt;
    paidAt?: Date;
    paymentReference?: string;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum PayrollEntriesPaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed"
}
