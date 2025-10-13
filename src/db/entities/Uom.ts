import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'inventory', comment: 'Units of measure with base unit conversion factors' })
@Unique({ name: 'uom_org_id_uom_code_key', properties: ['org', 'uomCode'] })
export class Uom {

  [PrimaryKeyProp]?: 'uomId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  uomId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_uom_org' })
  org!: Organizations;

  @Property({ length: 20 })
  uomCode!: string;

  @Property({ length: 100 })
  uomName!: string;

  @ManyToOne({ entity: () => Uom, nullable: true })
  base?: Uom;

  @Property({ type: 'decimal', precision: 18, scale: 6, nullable: true, defaultRaw: `1.0` })
  conversionFactor?: string;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
