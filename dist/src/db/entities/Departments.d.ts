import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Users } from './Users';
export declare class Departments {
    [PrimaryKeyProp]?: 'departmentId';
    departmentId: string & Opt;
    org: Organizations;
    departmentCode: string;
    departmentName: string;
    parent?: Departments;
    manager?: Users;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
