import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
import { LeaveTypes } from './LeaveTypes';
import { Organizations } from './Organizations';
export declare class LeaveEntitlements {
    [PrimaryKeyProp]?: 'entitlementId';
    entitlementId: string & Opt;
    org: Organizations;
    employee: Employees;
    leaveType: LeaveTypes;
    year: number;
    allocatedDays: string;
    usedDays: string & Opt;
    remainingDays?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
}
