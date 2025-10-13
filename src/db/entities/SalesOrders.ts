import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Channels } from './Channels';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { PriceLists } from './PriceLists';
import { Users } from './Users';

@Entity({ schema: 'sales', comment: 'Sales orders across all channels, partitioned by order date for performance' })
@Index({ name: 'idx_sales_orders_channel', properties: ['channel', 'orderDate'] })
@Index({ name: 'idx_sales_orders_customer', properties: ['customer', 'orderDate'] })
@Index({ name: 'idx_sales_orders_location', properties: ['location', 'orderDate'] })
@Index({ name: 'idx_sales_orders_order_number', properties: ['org', 'orderNumber'] })
@Index({ name: 'idx_sales_orders_salesperson', properties: ['salesperson', 'orderDate'] })
@Index({ name: 'idx_sales_orders_status', properties: ['org', 'orderStatus', 'orderDate'] })
export class SalesOrders {

  [PrimaryKeyProp]?: ['orderId', 'org', 'orderDate'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  orderId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', primary: true })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade' })
  location!: Locations;

  @ManyToOne({ entity: () => Channels, fieldName: 'channel_id' })
  channel!: Channels;

  @Property({ length: 50 })
  orderNumber!: string;

  @PrimaryKey({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  orderDate!: Date & Opt;

  @ManyToOne({ entity: () => Customers, fieldName: 'customer_id' })
  customer!: Customers;

  @ManyToOne({ entity: () => PriceLists, fieldName: 'price_list_id', nullable: true })
  priceList?: PriceLists;

  @Enum({ items: () => SalesOrdersOrderStatus })
  orderStatus: SalesOrdersOrderStatus & Opt = SalesOrdersOrderStatus.DRAFT;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` })
  exchangeRate?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  subtotal!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  discountAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  taxAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  totalAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  paidAmount!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(total_amount - paid_amount) stored', nullable: true })
  balanceDue?: string;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne({ entity: () => Users, fieldName: 'salesperson_id', nullable: true })
  salesperson?: Users;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum SalesOrdersOrderStatus {
  DRAFT = 'draft',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  READY = 'ready',
  DISPATCHED = 'dispatched',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
