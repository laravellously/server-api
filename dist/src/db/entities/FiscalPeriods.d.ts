import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class FiscalPeriods {
    [PrimaryKeyProp]?: 'periodId';
    periodId: string & Opt;
    org: Organizations;
    periodCode: string;
    periodName: string;
    fiscalYear: number;
    periodNumber: number;
    startDate: string;
    endDate: string;
    status: FiscalPeriodsStatus & Opt;
    closedAt?: Date;
    closedBy?: string;
    createdAt: Date & Opt;
}
export declare enum FiscalPeriodsStatus {
    OPEN = "open",
    CLOSED = "closed",
    LOCKED = "locked"
}
