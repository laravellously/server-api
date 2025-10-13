import { Entity, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity({ schema: 'core' })
export class Currencies {

  [PrimaryKeyProp]?: 'currencyCode';

  @PrimaryKey({ type: 'character', length: 3 })
  currencyCode!: string;

  @Property({ length: 100 })
  currencyName!: string;

  @Property({ length: 10, nullable: true })
  symbol?: string;

  @Property({ type: 'integer' })
  decimalPlaces: number & Opt = 2;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
