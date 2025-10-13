import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Organizations } from './Organizations';

@Entity({ schema: 'crm', comment: 'Multiple contact persons per customer organization' })
@Index({ name: 'idx_contacts_org_customer', expression: 'CREATE INDEX idx_contacts_org_customer ON crm.contacts USING btree (org_id, customer_id) WHERE (deleted_at IS NULL)', properties: ['org', 'customer'] })
export class Contacts {

  [PrimaryKeyProp]?: 'contactId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  contactId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id', deleteRule: 'cascade' })
  customer!: Customers;

  @Property({ length: 100 })
  firstName!: string;

  @Property({ length: 100 })
  lastName!: string;

  @Property({ length: 100, nullable: true })
  position?: string;

  @Index({ name: 'idx_contacts_email', expression: 'CREATE INDEX idx_contacts_email ON crm.contacts USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' })
  @Property({ nullable: true })
  email?: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ length: 20, nullable: true })
  mobile?: string;

  @Property({ type: 'boolean' })
  isPrimary: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
