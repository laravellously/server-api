import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Products } from './Products';
import { SalesReturns } from './SalesReturns';
import { Warehouses } from './Warehouses';

@Entity({ schema: 'sales' })
@Unique({ name: 'sales_return_lines_return_id_line_number_key', properties: ['return', 'lineNumber'] })
export class SalesReturnLines {

  [PrimaryKeyProp]?: 'returnLineId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  returnLineId!: string & Opt;

  @ManyToOne({ entity: () => SalesReturns, fieldName: 'return_id', deleteRule: 'cascade', index: 'idx_sales_return_lines_return' })
  return!: SalesReturns;

  @Property()
  lineNumber!: number;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', index: 'idx_sales_return_lines_product' })
  product!: Products;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  quantity!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  unitPrice!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, generated: '(quantity * unit_price) stored', nullable: true })
  lineTotal?: string;

  @ManyToOne({ entity: () => Warehouses, fieldName: 'warehouse_id', nullable: true })
  warehouse?: Warehouses;

  @Property({ type: 'boolean' })
  restocked: boolean & Opt = false;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
