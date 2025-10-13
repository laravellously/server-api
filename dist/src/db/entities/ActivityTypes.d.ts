import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class ActivityTypes {
    [PrimaryKeyProp]?: 'activityTypeId';
    activityTypeId: string & Opt;
    org: Organizations;
    typeCode: string;
    typeName: string;
    category: ActivityTypesCategory;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
export declare enum ActivityTypesCategory {
    CALL = "CALL",
    EMAIL = "EMAIL",
    MEETING = "MEETING",
    TASK = "TASK",
    NOTE = "NOTE",
    SMS = "SMS",
    WHATSAPP = "WHATSAPP"
}
