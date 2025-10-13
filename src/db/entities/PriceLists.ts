import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'sales', comment: 'Price lists for different customer segments, channels, or promotions' })
@Index({ name: 'idx_price_lists_effective', expression: 'CREATE INDEX idx_price_lists_effective ON sales.price_lists USING btree (org_id, effective_from, effective_to) WHERE (deleted_at IS NULL)', properties: ['org', 'effectiveFrom', 'effectiveTo'] })
@Unique({ name: 'price_lists_org_id_price_list_code_key', properties: ['org', 'priceListCode'] })
export class PriceLists {

  [PrimaryKeyProp]?: 'priceListId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  priceListId!: string & Opt;

  @Index({ name: 'idx_price_lists_org', expression: 'CREATE INDEX idx_price_lists_org ON sales.price_lists USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  priceListCode!: string;

  @Property()
  priceListName!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'character', length: 3 })
  currency: string & Opt = 'NGN';

  @Property({ type: 'boolean' })
  isDefault: boolean & Opt = false;

  @Property({ type: 'date' })
  effectiveFrom!: string;

  @Property({ type: 'date', nullable: true })
  effectiveTo?: string;

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
