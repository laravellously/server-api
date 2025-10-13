import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Brands } from './Brands';
import { Organizations } from './Organizations';
import { ProductCategories } from './ProductCategories';
import { TaxConfigs } from './TaxConfigs';
import { Uom } from './Uom';

@Entity({ schema: 'inventory', comment: 'Master product catalog with SKUs, costing methods, and tracking options' })
@Index({ name: 'idx_products_active', expression: 'CREATE INDEX idx_products_active ON inventory.products USING btree (org_id, is_active) WHERE (deleted_at IS NULL)', properties: ['org', 'isActive'] })
@Index({ name: 'idx_products_sku', expression: 'CREATE INDEX idx_products_sku ON inventory.products USING btree (org_id, sku) WHERE (deleted_at IS NULL)', properties: ['org', 'sku'] })
@Unique({ name: 'products_org_id_sku_key', properties: ['org', 'sku'] })
export class Products {

  [PrimaryKeyProp]?: 'productId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  productId!: string & Opt;

  @Index({ name: 'idx_products_org', expression: 'CREATE INDEX idx_products_org ON inventory.products USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 100 })
  sku!: string;

  @Index({ name: 'idx_products_barcode', expression: 'CREATE INDEX idx_products_barcode ON inventory.products USING btree (barcode) WHERE ((deleted_at IS NULL) AND (barcode IS NOT NULL))' })
  @Property({ length: 100, nullable: true })
  barcode?: string;

  @Property()
  productName!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Index({ name: 'idx_products_category', expression: 'CREATE INDEX idx_products_category ON inventory.products USING btree (category_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => ProductCategories, fieldName: 'category_id', nullable: true })
  category?: ProductCategories;

  @Index({ name: 'idx_products_brand', expression: 'CREATE INDEX idx_products_brand ON inventory.products USING btree (brand_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Brands, fieldName: 'brand_id', nullable: true })
  brand?: Brands;

  @ManyToOne({ entity: () => Uom, fieldName: 'uom_id' })
  uom!: Uom;

  @Enum({ items: () => ProductsProductType })
  productType: ProductsProductType & Opt = ProductsProductType.STANDARD;

  @Property({ type: 'boolean' })
  isSerialized: boolean & Opt = false;

  @Property({ type: 'boolean' })
  isBatchTracked: boolean & Opt = false;

  @Property({ type: 'boolean' })
  hasExpiry: boolean & Opt = false;

  @Enum({ items: () => ProductsCostMethod, comment: 'Inventory costing: FIFO, LIFO, or Weighted Average Cost' })
  costMethod: ProductsCostMethod & Opt = ProductsCostMethod.FIFO;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  standardCost!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, defaultRaw: `0` })
  baseSellingPrice!: string & Opt;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  reorderLevel?: string;

  @Property({ type: 'decimal', precision: 18, scale: 4, nullable: true, defaultRaw: `0` })
  reorderQuantity?: string;

  @ManyToOne({ entity: () => TaxConfigs, fieldName: 'tax_config_id', nullable: true })
  taxConfig?: TaxConfigs;

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

export enum ProductsProductType {
  STANDARD = 'standard',
  SERVICE = 'service',
  DIGITAL = 'digital',
  BUNDLE = 'bundle',
}

export enum ProductsCostMethod {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
  WAC = 'WAC',
}
