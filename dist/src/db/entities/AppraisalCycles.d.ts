import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class AppraisalCycles {
    [PrimaryKeyProp]?: 'cycleId';
    cycleId: string & Opt;
    org: Organizations;
    cycleName: string;
    startDate: string;
    endDate: string;
    status: AppraisalCyclesStatus & Opt;
    createdAt: Date & Opt;
    createdBy?: string;
}
export declare enum AppraisalCyclesStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
