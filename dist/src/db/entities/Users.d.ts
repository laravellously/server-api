import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class Users {
    [PrimaryKeyProp]?: 'userId';
    userId: string & Opt;
    org: Organizations;
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone?: string;
    status: UsersStatus & Opt;
    role: UsersRole;
    default?: Locations;
    lastLoginAt?: Date;
    lastLoginIp?: unknown;
    failedLoginAttempts: number & Opt;
    passwordChangedAt?: Date;
    mustChangePassword: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum UsersStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    LOCKED = "locked",
    INACTIVE = "inactive"
}
export declare enum UsersRole {
    SUPER_ADMIN = "super_admin",
    ORG_ADMIN = "org_admin",
    LOCATION_MANAGER = "location_manager",
    ACCOUNTANT = "accountant",
    POS_CASHIER = "pos_cashier",
    INVENTORY_MANAGER = "inventory_manager",
    SALES_REP = "sales_rep",
    HR_MANAGER = "hr_manager",
    CRM_USER = "crm_user",
    READONLY_USER = "readonly_user"
}
