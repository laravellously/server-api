import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { AppraisalCycles } from './AppraisalCycles';
import { Employees } from './Employees';
import { Organizations } from './Organizations';
import { Users } from './Users';
export declare class Appraisals {
    [PrimaryKeyProp]?: 'appraisalId';
    appraisalId: string & Opt;
    org: Organizations;
    cycle: AppraisalCycles;
    employee: Employees;
    appraiser: Users;
    appraisalDate: string;
    overallRating?: string;
    strengths?: string;
    areasForImprovement?: string;
    goalsNextPeriod?: string;
    employeeComments?: string;
    status: AppraisalsStatus & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
export declare enum AppraisalsStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    FINALIZED = "finalized"
}
