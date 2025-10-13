import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'inventory' })
@Unique({ name: 'brands_org_id_brand_code_key', properties: ['org', 'brandCode'] })
export class Brands {

  [PrimaryKeyProp]?: 'brandId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  brandId!: string & Opt;

  @Index({ name: 'idx_brands_org', expression: 'CREATE INDEX idx_brands_org ON inventory.brands USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  brandCode!: string;

  @Property()
  brandName!: string;

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

}
