import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Products } from './Products';
import { SalesOrders } from './SalesOrders';
import { TaxConfigs } from './TaxConfigs';
import { Warehouses } from './Warehouses';

@Entity({ schema: 'sales', comment: 'Line items for sales orders with pricing, discounts, and taxes' })
@Index({ name: 'idx_sales_order_lines_order', expression: 'create index "idx_sales_order_lines_order" on "sales_order_lines" ("org_id", "order_id")' })
@Unique({ name: 'sales_order_lines_org_id_order_id_line_number_key', expression: 'create unique index "sales_order_lines_org_id_order_id_line_number_key" on "sales_order_lines" ("org_id", "order_id", "line_number")' })
export class SalesOrderLines {

  [PrimaryKeyProp]?: 'orderLineId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  orderLineId!: string & Opt;

  @Property()
  lineNumber!: number;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', index: 'idx_sales_order_lines_product' })
  product!: Products;

  @ManyToOne({ entity: () => Warehouses, fieldName: 'warehouse_id', index: 'idx_sales_order_lines_warehouse' })
  warehouse!: Warehouses;

  @Property({ length: 100, nullable: true })
  batchNumber?: string;

  @Property({ length: 100, nullable: true })
  serialNumber?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  quantity!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  unitPrice!: string;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` })
  discountPercent?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  discountAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '((quantity * unit_price) - discount_amount) stored', nullable: true })
  lineSubtotal?: string;

  @ManyToOne({ entity: () => TaxConfigs, fieldName: 'tax_config_id', nullable: true })
  taxConfig?: TaxConfigs;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  taxAmount?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(((quantity * unit_price) - discount_amount) + tax_amount) stored', nullable: true })
  lineTotal?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  quantityFulfilled!: string & Opt;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @ManyToOne({ entity: () => SalesOrders, fieldNames: ['org_id', 'order_id', 'order_date'], deleteRule: 'cascade' })
  'sales.salesOrders'!: SalesOrders;
}
