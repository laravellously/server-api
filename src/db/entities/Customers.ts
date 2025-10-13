import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { PriceLists } from './PriceLists';

@Entity({ schema: 'sales', comment: 'Customer master with credit limits, loyalty points, and pricing' })
@Index({ name: 'idx_customers_name', expression: 'CREATE INDEX idx_customers_name ON sales.customers USING btree (org_id, customer_name) WHERE (deleted_at IS NULL)', properties: ['org', 'customerName'] })
@Unique({ name: 'customers_org_id_customer_code_key', properties: ['org', 'customerCode'] })
export class Customers {

  [PrimaryKeyProp]?: 'customerId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  customerId!: string & Opt;

  @Index({ name: 'idx_customers_org', expression: 'CREATE INDEX idx_customers_org ON sales.customers USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  customerCode!: string;

  @Property()
  customerName!: string;

  @Enum({ items: () => CustomersCustomerType })
  customerType: CustomersCustomerType & Opt = CustomersCustomerType.INDIVIDUAL;

  @Index({ name: 'idx_customers_email', expression: 'CREATE INDEX idx_customers_email ON sales.customers USING btree (email) WHERE ((deleted_at IS NULL) AND (email IS NOT NULL))' })
  @Property({ nullable: true })
  email?: string;

  @Index({ name: 'idx_customers_phone', expression: 'CREATE INDEX idx_customers_phone ON sales.customers USING btree (phone) WHERE ((deleted_at IS NULL) AND (phone IS NOT NULL))' })
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

  @Property({ length: 50, nullable: true })
  taxId?: string;

  @ManyToOne({ entity: () => PriceLists, fieldName: 'price_list_id', nullable: true })
  priceList?: PriceLists;

  @Property({ length: 100, nullable: true })
  paymentTerms?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  creditLimit?: string;

  @Property({ type: 'integer', nullable: true })
  loyaltyPoints?: number = 0;

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

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum CustomersCustomerType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate',
}
