import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class OpportunityStages {
    [PrimaryKeyProp]?: 'stageId';
    stageId: string & Opt;
    org: Organizations;
    stageCode: string;
    stageName: string;
    stageOrder: number;
    probability?: string;
    isClosed: boolean & Opt;
    isWon: boolean & Opt;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
