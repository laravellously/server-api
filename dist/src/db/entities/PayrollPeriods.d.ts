import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class PayrollPeriods {
    [PrimaryKeyProp]?: 'periodId';
    periodId: string & Opt;
    org: Organizations;
    periodCode: string;
    periodName: string;
    startDate: string;
    endDate: string;
    paymentDate: string;
    status: PayrollPeriodsStatus & Opt;
    totalGross?: string;
    totalDeductions?: string;
    totalNet?: string;
    processedAt?: Date;
    processedBy?: string;
    approvedAt?: Date;
    approvedBy?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum PayrollPeriodsStatus {
    DRAFT = "draft",
    PROCESSING = "processing",
    APPROVED = "approved",
    PAID = "paid",
    CLOSED = "closed"
}
