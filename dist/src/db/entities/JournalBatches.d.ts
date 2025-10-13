import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class JournalBatches {
    [PrimaryKeyProp]?: 'batchId';
    batchId: string & Opt;
    org: Organizations;
    batchNumber: string;
    batchDate: string;
    description?: string;
    status: JournalBatchesStatus & Opt;
    postedAt?: Date;
    postedBy?: string;
    createdAt: Date & Opt;
    createdBy: string;
}
export declare enum JournalBatchesStatus {
    DRAFT = "draft",
    POSTED = "posted",
    VOID = "void"
}
