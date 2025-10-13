import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Products } from './Products';
import { Warehouses } from './Warehouses';

@Entity({ schema: 'inventory', comment: 'Real-time stock quantities with batch/lot tracking and reservations' })
@Index({ name: 'idx_stock_balances_org_product', properties: ['org', 'product'] })
@Unique({ name: 'stock_balances_org_id_product_id_warehouse_id_batch_number__key', properties: ['org', 'product', 'warehouse', 'batchNumber', 'serialNumber'] })
export class StockBalances {

  [PrimaryKeyProp]?: 'stockBalanceId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  stockBalanceId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', deleteRule: 'cascade' })
  product!: Products;

  @ManyToOne({ entity: () => Warehouses, fieldName: 'warehouse_id', deleteRule: 'cascade', index: 'idx_stock_balances_warehouse' })
  warehouse!: Warehouses;

  @Index({ name: 'idx_stock_balances_batch', expression: 'CREATE INDEX idx_stock_balances_batch ON inventory.stock_balances USING btree (batch_number) WHERE (batch_number IS NOT NULL)' })
  @Property({ length: 100, nullable: true })
  batchNumber?: string;

  @Index({ name: 'idx_stock_balances_serial', expression: 'CREATE INDEX idx_stock_balances_serial ON inventory.stock_balances USING btree (serial_number) WHERE (serial_number IS NOT NULL)' })
  @Property({ length: 100, nullable: true })
  serialNumber?: string;

  @Index({ name: 'idx_stock_balances_expiry', expression: 'CREATE INDEX idx_stock_balances_expiry ON inventory.stock_balances USING btree (expiry_date) WHERE (expiry_date IS NOT NULL)' })
  @Property({ type: 'date', nullable: true })
  expiryDate?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  quantityOnHand!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, comment: 'Quantity allocated to orders but not yet fulfilled', defaultRaw: `0` })
  quantityReserved!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(quantity_on_hand - quantity_reserved) stored', nullable: true })
  quantityAvailable?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  averageCost!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  lastCost!: string & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

}
