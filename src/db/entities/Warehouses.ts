import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'inventory', comment: 'Warehouses/storage areas within physical locations' })
@Index({ name: 'idx_warehouses_org_location', expression: 'CREATE INDEX idx_warehouses_org_location ON inventory.warehouses USING btree (org_id, location_id) WHERE (deleted_at IS NULL)', properties: ['org', 'location'] })
@Unique({ name: 'warehouses_org_id_location_id_warehouse_code_key', properties: ['org', 'location', 'warehouseCode'] })
export class Warehouses {

  [PrimaryKeyProp]?: 'warehouseId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  warehouseId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade' })
  location!: Locations;

  @Property({ length: 50 })
  warehouseCode!: string;

  @Property()
  warehouseName!: string;

  @Enum({ items: () => WarehousesWarehouseType, nullable: true })
  warehouseType?: WarehousesWarehouseType;

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

export enum WarehousesWarehouseType {
  MAIN = 'main',
  TRANSIT = 'transit',
  RETAIL = 'retail',
  DAMAGED = 'damaged',
  QUARANTINE = 'quarantine',
}
