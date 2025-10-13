import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'core', comment: 'Organization-specific tax configurations (VAT, WHT, etc.)' })
@Index({ name: 'idx_tax_configs_org', properties: ['org', 'isActive'] })
export class TaxConfigs {

  [PrimaryKeyProp]?: 'taxConfigId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  taxConfigId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Enum({ items: () => TaxConfigsTaxType })
  taxType!: TaxConfigsTaxType;

  @Property({ length: 100 })
  taxName!: string;

  @Property({ type: 'decimal', precision: 5, scale: 2 })
  taxRate!: string;

  @Property({ type: 'boolean' })
  isInclusive: boolean & Opt = false;

  @Property({ length: 50, nullable: true })
  appliesTo?: string;

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

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum TaxConfigsTaxType {
  VAT = 'VAT',
  WHT = 'WHT',
  EXCISE = 'EXCISE',
  IMPORT_DUTY = 'IMPORT_DUTY',
  OTHER = 'OTHER',
}
