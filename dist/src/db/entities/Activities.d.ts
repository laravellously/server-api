import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { ActivityTypes } from './ActivityTypes';
import { Customers } from './Customers';
import { Leads } from './Leads';
import { Locations } from './Locations';
import { Opportunities } from './Opportunities';
import { Organizations } from './Organizations';
import { Users } from './Users';
export declare class Activities {
    [PrimaryKeyProp]?: 'activityId';
    activityId: string & Opt;
    org: Organizations;
    location?: Locations;
    activityType: ActivityTypes;
    subject: string;
    description?: string;
    activityDate: Date & Opt;
    dueDate?: Date;
    completedDate?: Date;
    priority?: ActivitiesPriority;
    status: ActivitiesStatus & Opt;
    customer?: Customers;
    lead?: Leads;
    opportunity?: Opportunities;
    assignedTo: Users;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum ActivitiesPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare enum ActivitiesStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
