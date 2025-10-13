import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Customers } from './Customers';
import { LeadSources } from './LeadSources';
import { LeadStatuses } from './LeadStatuses';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'crm', comment: 'Sales leads with conversion tracking to customers' })
@Index({ name: 'idx_leads_converted', properties: ['org', 'convertedToCustomer'] })
@Unique({ name: 'leads_org_id_lead_number_key', properties: ['org', 'leadNumber'] })
export class Leads {

  [PrimaryKeyProp]?: 'leadId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  leadId!: string & Opt;

  @Index({ name: 'idx_leads_org', expression: 'CREATE INDEX idx_leads_org ON crm.leads USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Index({ name: 'idx_leads_location', expression: 'CREATE INDEX idx_leads_location ON crm.leads USING btree (location_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Property({ length: 50 })
  leadNumber!: string;

  @Property({ length: 100, nullable: true })
  firstName?: string;

  @Property({ length: 100, nullable: true })
  lastName?: string;

  @Property({ nullable: true })
  companyName?: string;

  @Index({ name: 'idx_leads_email', expression: 'CREATE INDEX idx_leads_email ON crm.leads USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' })
  @Property({ nullable: true })
  email?: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ length: 20, nullable: true })
  mobile?: string;

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ length: 100, nullable: true })
  city?: string;

  @Property({ length: 100, nullable: true })
  state?: string;

  @Property({ type: 'character', length: 2, nullable: true })
  country?: string = 'NG';

  @ManyToOne({ entity: () => LeadSources, fieldName: 'source_id', nullable: true })
  source?: LeadSources;

  @Index({ name: 'idx_leads_status', expression: 'CREATE INDEX idx_leads_status ON crm.leads USING btree (status_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => LeadStatuses, fieldName: 'status_id' })
  status!: LeadStatuses;

  @Index({ name: 'idx_leads_assigned', expression: 'CREATE INDEX idx_leads_assigned ON crm.leads USING btree (assigned_to) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Users, fieldName: 'assigned_to', nullable: true })
  assignedTo?: Users;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  estimatedValue?: string;

  @Property({ type: 'date', nullable: true })
  expectedCloseDate?: string;

  @Property({ type: 'boolean' })
  convertedToCustomer: boolean & Opt = false;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id', nullable: true })
  customer?: Customers;

  @Property({ nullable: true })
  convertedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  convertedBy?: string;

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
