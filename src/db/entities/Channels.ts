import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'sales', comment: 'Sales channels (POS, online, marketplace) with channel-specific configurations' })
@Unique({ name: 'channels_org_id_channel_code_key', properties: ['org', 'channelCode'] })
export class Channels {

  [PrimaryKeyProp]?: 'channelId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  channelId!: string & Opt;

  @Index({ name: 'idx_channels_org', expression: 'CREATE INDEX idx_channels_org ON sales.channels USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  channelCode!: string;

  @Property()
  channelName!: string;

  @Enum({ items: () => ChannelsChannelType })
  channelType!: ChannelsChannelType;

  @Index({ name: 'idx_channels_location', expression: 'CREATE INDEX idx_channels_location ON sales.channels USING btree (location_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'json', nullable: true })
  config?: any;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}

export enum ChannelsChannelType {
  POS = 'POS',
  ONLINE = 'ONLINE',
  MARKETPLACE = 'MARKETPLACE',
  MOBILE = 'MOBILE',
  PHONE = 'PHONE',
  WHOLESALE = 'WHOLESALE',
}
