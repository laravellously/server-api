import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class LeaveTypes {
    [PrimaryKeyProp]?: 'leaveTypeId';
    leaveTypeId: string & Opt;
    org: Organizations;
    typeCode: string;
    typeName: string;
    defaultDays: number;
    isPaid: boolean & Opt;
    requiresApproval: boolean & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
