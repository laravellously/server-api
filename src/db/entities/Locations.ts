import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'core', comment: 'Physical locations (stores, warehouses, branches) belonging to organizations' })
@Index({ name: 'idx_locations_status', expression: 'CREATE INDEX idx_locations_status ON core.locations USING btree (org_id, status) WHERE (deleted_at IS NULL)', properties: ['org', 'status'] })
@Index({ name: 'idx_locations_type', expression: 'CREATE INDEX idx_locations_type ON core.locations USING btree (org_id, location_type) WHERE (deleted_at IS NULL)', properties: ['org', 'locationType'] })
@Unique({ name: 'locations_org_id_location_code_key', properties: ['org', 'locationCode'] })
export class Locations {

  [PrimaryKeyProp]?: 'locationId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  locationId!: string & Opt;

  @Index({ name: 'idx_locations_org_id', expression: 'CREATE INDEX idx_locations_org_id ON core.locations USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 20 })
  locationCode!: string;

  @Property()
  locationName!: string;

  @Enum({ items: () => LocationsLocationType })
  locationType!: LocationsLocationType;

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ length: 100, nullable: true })
  city?: string;

  @Property({ length: 100, nullable: true })
  state?: string;

  @Property({ type: 'character', length: 2 })
  country: string & Opt = 'NG';

  @Property({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude?: string;

  @Property({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude?: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ nullable: true })
  email?: string;

  @Index({ name: 'idx_locations_manager', expression: 'CREATE INDEX idx_locations_manager ON core.locations USING btree (manager_user_id) WHERE (deleted_at IS NULL)' })
  @Property({ type: 'uuid', nullable: true })
  managerUserId?: string;

  @Property({ type: 'boolean', comment: 'Indicates primary/head office location' })
  isPrimary: boolean & Opt = false;

  @Enum({ items: () => LocationsStatus })
  status: LocationsStatus & Opt = LocationsStatus.ACTIVE;

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

export enum LocationsLocationType {
  STORE = 'store',
  WAREHOUSE = 'warehouse',
  OFFICE = 'office',
  FACTORY = 'factory',
  SERVICE_CENTER = 'service_center',
}

export enum LocationsStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CLOSED = 'closed',
}
