import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Users } from './Users';

@Entity({ schema: 'core', comment: 'Maps users to accessible locations for location-scoped RLS' })
@Unique({ name: 'user_locations_user_id_location_id_key', properties: ['user', 'location'] })
export class UserLocations {

  [PrimaryKeyProp]?: 'userLocationId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  userLocationId!: string & Opt;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', deleteRule: 'cascade', index: 'idx_user_locations_user' })
  user!: Users;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', deleteRule: 'cascade', index: 'idx_user_locations_location' })
  location!: Locations;

  @Property({ type: 'boolean' })
  canAccess: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
