import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'sales', comment: 'Product returns with refund/exchange tracking' })
@Index({ name: 'idx_sales_returns_customer', properties: ['customer', 'returnDate'] })
@Index({ name: 'idx_sales_returns_org', properties: ['org', 'returnDate'] })
@Index({ name: 'idx_sales_returns_status', properties: ['org', 'returnStatus'] })
@Unique({ name: 'sales_returns_org_id_return_number_key', properties: ['org', 'returnNumber'] })
export class SalesReturns {

  [PrimaryKeyProp]?: 'returnId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  returnId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade' })
  location!: Locations;

  @Property({ length: 50 })
  returnNumber!: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  returnDate!: Date & Opt;

  @Index({ name: 'idx_sales_returns_order', expression: 'CREATE INDEX idx_sales_returns_order ON sales.sales_returns USING btree (order_id) WHERE (order_id IS NOT NULL)' })
  @Property({ type: 'uuid', nullable: true })
  orderId?: string;

  @Property({ type: 'uuid', nullable: true })
  invoiceId?: string;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id' })
  customer!: Customers;

  @Property({ nullable: true })
  returnReason?: string;

  @Enum({ items: () => SalesReturnsReturnType })
  returnType: SalesReturnsReturnType & Opt = SalesReturnsReturnType.REFUND;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  totalAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  refundAmount!: string & Opt;

  @Enum({ items: () => SalesReturnsReturnStatus })
  returnStatus: SalesReturnsReturnStatus & Opt = SalesReturnsReturnStatus.PENDING;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum SalesReturnsReturnType {
  REFUND = 'refund',
  EXCHANGE = 'exchange',
  CREDIT = 'credit',
}

export enum SalesReturnsReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}
