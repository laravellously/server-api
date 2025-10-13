import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class LeadStatuses {
    [PrimaryKeyProp]?: 'statusId';
    statusId: string & Opt;
    org: Organizations;
    statusCode: string;
    statusName: string;
    statusOrder: number;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
