import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class LeadSources {
    [PrimaryKeyProp]?: 'sourceId';
    sourceId: string & Opt;
    org: Organizations;
    sourceCode: string;
    sourceName: string;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
