import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { ActivityTypes } from './ActivityTypes';
import { Customers } from './Customers';
import { Leads } from './Leads';
import { Locations } from './Locations';
import { Opportunities } from './Opportunities';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'crm', comment: 'Customer interaction activities and tasks' })
@Index({ name: 'idx_activities_assigned', properties: ['assignedTo', 'activityDate'] })
@Index({ name: 'idx_activities_customer', properties: ['customer', 'activityDate'] })
@Index({ name: 'idx_activities_lead', properties: ['lead', 'activityDate'] })
@Index({ name: 'idx_activities_opportunity', properties: ['opportunity', 'activityDate'] })
@Index({ name: 'idx_activities_org', properties: ['org', 'activityDate'] })
@Index({ name: 'idx_activities_status', properties: ['org', 'status', 'dueDate'] })
export class Activities {

  [PrimaryKeyProp]?: 'activityId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  activityId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true, index: 'idx_activities_location' })
  location?: Locations;

  @ManyToOne({ entity: () => ActivityTypes, fieldName: 'activity_type_id' })
  activityType!: ActivityTypes;

  @Property()
  subject!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  activityDate!: Date & Opt;

  @Property({ nullable: true })
  dueDate?: Date;

  @Property({ nullable: true })
  completedDate?: Date;

  @Enum({ items: () => ActivitiesPriority, nullable: true })
  priority?: ActivitiesPriority = ActivitiesPriority.MEDIUM;

  @Enum({ items: () => ActivitiesStatus })
  status: ActivitiesStatus & Opt = ActivitiesStatus.PENDING;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id', nullable: true })
  customer?: Customers;

  @ManyToOne({ entity: () => Leads, fieldName: 'lead_id', nullable: true })
  lead?: Leads;

  @ManyToOne({ entity: () => Opportunities, fieldName: 'opportunity_id', nullable: true })
  opportunity?: Opportunities;

  @ManyToOne({ entity: () => Users, fieldName: 'assigned_to' })
  assignedTo!: Users;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum ActivitiesPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum ActivitiesStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
