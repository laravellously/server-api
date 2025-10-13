import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'inventory', comment: 'Hierarchical product categories' })
@Unique({ name: 'product_categories_org_id_category_code_key', properties: ['org', 'categoryCode'] })
export class ProductCategories {

  [PrimaryKeyProp]?: 'categoryId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  categoryId!: string & Opt;

  @Index({ name: 'idx_product_categories_org', expression: 'CREATE INDEX idx_product_categories_org ON inventory.product_categories USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Index({ name: 'idx_product_categories_parent', expression: 'CREATE INDEX idx_product_categories_parent ON inventory.product_categories USING btree (parent_category_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => ProductCategories, nullable: true })
  parent?: ProductCategories;

  @Property({ length: 50 })
  categoryCode!: string;

  @Property()
  categoryName!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

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
