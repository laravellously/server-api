import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Leads } from './Leads';
import { Locations } from './Locations';
import { OpportunityStages } from './OpportunityStages';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'crm', comment: 'Sales opportunities with pipeline tracking' })
@Index({ name: 'idx_opportunities_close_date', expression: 'CREATE INDEX idx_opportunities_close_date ON crm.opportunities USING btree (org_id, expected_close_date) WHERE (NOT is_closed)', properties: ['org', 'expectedCloseDate'] })
@Unique({ name: 'opportunities_org_id_opportunity_number_key', properties: ['org', 'opportunityNumber'] })
export class Opportunities {

  [PrimaryKeyProp]?: 'opportunityId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  opportunityId!: string & Opt;

  @Index({ name: 'idx_opportunities_org', expression: 'CREATE INDEX idx_opportunities_org ON crm.opportunities USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Index({ name: 'idx_opportunities_location', expression: 'CREATE INDEX idx_opportunities_location ON crm.opportunities USING btree (location_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Property({ length: 50 })
  opportunityNumber!: string;

  @Property()
  opportunityName!: string;

  @Index({ name: 'idx_opportunities_customer', expression: 'CREATE INDEX idx_opportunities_customer ON crm.opportunities USING btree (customer_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id', nullable: true })
  customer?: Customers;

  @ManyToOne({ entity: () => Leads, fieldName: 'lead_id', nullable: true })
  lead?: Leads;

  @Index({ name: 'idx_opportunities_stage', expression: 'CREATE INDEX idx_opportunities_stage ON crm.opportunities USING btree (stage_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => OpportunityStages, fieldName: 'stage_id' })
  stage!: OpportunityStages;

  @Index({ name: 'idx_opportunities_assigned', expression: 'CREATE INDEX idx_opportunities_assigned ON crm.opportunities USING btree (assigned_to) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Users, fieldName: 'assigned_to', nullable: true })
  assignedTo?: Users;

  @Property({ type: 'decimal', precision: 18, scale: 2, defaultRaw: `0` })
  expectedValue!: string & Opt;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  probability?: string;

  @Property({ type: 'date', nullable: true })
  expectedCloseDate?: string;

  @Property({ type: 'date', nullable: true })
  actualCloseDate?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'boolean' })
  isClosed: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isWon: boolean & Opt = false;

  @Property({ type: 'text', nullable: true })
  closedReason?: string;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}
