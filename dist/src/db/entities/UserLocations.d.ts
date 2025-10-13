import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Users } from './Users';
export declare class UserLocations {
    [PrimaryKeyProp]?: 'userLocationId';
    userLocationId: string & Opt;
    user: Users;
    location: Locations;
    canAccess: boolean & Opt;
    createdAt: Date & Opt;
    createdBy?: string;
}
