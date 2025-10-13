import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
import { LeaveTypes } from './LeaveTypes';
import { Organizations } from './Organizations';
import { Users } from './Users';
export declare class LeaveApplications {
    [PrimaryKeyProp]?: 'applicationId';
    applicationId: string & Opt;
    org: Organizations;
    employee: Employees;
    leaveType: LeaveTypes;
    applicationDate: string & Opt;
    startDate: string;
    endDate: string;
    totalDays: string;
    reason?: string;
    status: LeaveApplicationsStatus & Opt;
    approvedBy?: Users;
    approvedAt?: Date;
    rejectionReason?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum LeaveApplicationsStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
