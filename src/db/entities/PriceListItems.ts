import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { PriceLists } from './PriceLists';
import { Products } from './Products';

@Entity({ schema: 'sales' })
@Unique({ name: 'price_list_items_price_list_id_product_id_min_quantity_key', properties: ['priceList', 'product', 'minQuantity'] })
export class PriceListItems {

  [PrimaryKeyProp]?: 'priceListItemId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  priceListItemId!: string & Opt;

  @ManyToOne({ entity: () => PriceLists, fieldName: 'price_list_id', deleteRule: 'cascade', index: 'idx_price_list_items_price_list' })
  priceList!: PriceLists;

  @ManyToOne({ entity: () => Products, fieldName: 'product_id', deleteRule: 'cascade', index: 'idx_price_list_items_product' })
  product!: Products;

  @Property({ type: 'decimal', precision: 18, scale: 4 })
  unitPrice!: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `1` })
  minQuantity?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  maxQuantity?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
