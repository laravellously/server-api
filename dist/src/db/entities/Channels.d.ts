import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class Channels {
    [PrimaryKeyProp]?: 'channelId';
    channelId: string & Opt;
    org: Organizations;
    channelCode: string;
    channelName: string;
    channelType: ChannelsChannelType;
    location?: Locations;
    isActive: boolean & Opt;
    config?: any;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    deletedAt?: Date;
    createdBy?: string;
}
export declare enum ChannelsChannelType {
    POS = "POS",
    ONLINE = "ONLINE",
    MARKETPLACE = "MARKETPLACE",
    MOBILE = "MOBILE",
    PHONE = "PHONE",
    WHOLESALE = "WHOLESALE"
}
