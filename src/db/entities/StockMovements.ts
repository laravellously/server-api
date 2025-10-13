import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Products } from './Products';
import { Warehouses } from './Warehouses';

@Entity({ schema: 'inventory', comment: 'Partitioned transaction log of all inventory movements (receipts, issues, transfers, adjustments)' })
@Index({ name: 'idx_stock_movements_org_product', properties: ['org', 'product', 'movementDate'] })
@Index({ name: 'idx_stock_movements_reference', properties: ['referenceType', 'referenceId'] })
@Index({ name: 'idx_stock_movements_warehouse', properties: ['warehouse', 'movementDate'] })
export class StockMovements {

  [PrimaryKeyProp]?: 'movementId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  movementId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', deleteRule: 'cascade' })
  product!: Products;

  @ManyToOne({ entity: () => Warehouses, fieldName: 'warehouse_id', deleteRule: 'cascade' })
  warehouse!: Warehouses;

  @Enum({ items: () => StockMovementsMovementType })
  movementType!: StockMovementsMovementType;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  movementDate!: Date & Opt;

  @Index({ name: 'idx_stock_movements_batch', expression: 'CREATE INDEX idx_stock_movements_batch ON ONLY inventory.stock_movements USING btree (batch_number) WHERE (batch_number IS NOT NULL)' })
  @Property({ length: 100, nullable: true })
  batchNumber?: string;

  @Property({ length: 100, nullable: true })
  serialNumber?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  quantity!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  unitCost!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(abs(quantity) * unit_cost) stored', nullable: true })
  totalCost?: string;

  @Property({ length: 50, nullable: true })
  referenceType?: string;

  @Property({ type: 'uuid', nullable: true })
  referenceId?: string;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid' })
  createdBy!: string;

}

export enum StockMovementsMovementType {
  RECEIPT = 'RECEIPT',
  ISSUE = 'ISSUE',
  TRANSFER_OUT = 'TRANSFER_OUT',
  TRANSFER_IN = 'TRANSFER_IN',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
  SALE = 'SALE',
  PURCHASE = 'PURCHASE',
  WRITE_OFF = 'WRITE_OFF',
}
