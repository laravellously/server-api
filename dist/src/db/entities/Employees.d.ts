import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Departments } from './Departments';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { Positions } from './Positions';
import { Users } from './Users';
export declare class Employees {
    [PrimaryKeyProp]?: 'employeeId';
    employeeId: string & Opt;
    org: Organizations;
    user?: Users;
    employeeNumber: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth?: string;
    gender?: EmployeesGender;
    maritalStatus?: EmployeesMaritalStatus;
    email?: string;
    phone?: string;
    mobile?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    nin?: string;
    bvn?: string;
    taxId?: string;
    position?: Positions;
    department?: Departments;
    location?: Locations;
    manager?: Employees;
    hireDate: string;
    terminationDate?: string;
    employmentType: EmployeesEmploymentType & Opt;
    employmentStatus: EmployeesEmploymentStatus & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare enum EmployeesGender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare enum EmployeesMaritalStatus {
    SINGLE = "single",
    MARRIED = "married",
    DIVORCED = "divorced",
    WIDOWED = "widowed"
}
export declare enum EmployeesEmploymentType {
    PERMANENT = "permanent",
    CONTRACT = "contract",
    TEMPORARY = "temporary",
    INTERN = "intern"
}
export declare enum EmployeesEmploymentStatus {
    ACTIVE = "active",
    ON_LEAVE = "on_leave",
    SUSPENDED = "suspended",
    TERMINATED = "terminated"
}
