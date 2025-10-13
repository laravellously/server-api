import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Departments } from './Departments';
import { Organizations } from './Organizations';
export declare class Positions {
    [PrimaryKeyProp]?: 'positionId';
    positionId: string & Opt;
    org: Organizations;
    positionCode: string;
    positionTitle: string;
    department?: Departments;
    gradeLevel?: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
