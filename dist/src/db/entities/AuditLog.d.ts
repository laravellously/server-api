import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
export declare class AuditLog {
    [PrimaryKeyProp]?: ['auditId', 'orgId', 'performedAt'];
    auditId: string & Opt;
    orgId: string;
    tableSchema: string;
    tableName: string;
    operation: AuditLogOperation;
    recordId: string;
    oldData?: any;
    newData?: any;
    changedFields?: string[];
    performedAt: Date & Opt;
    performedBy?: string;
    ipAddress?: unknown;
    userAgent?: string;
}
export declare enum AuditLogOperation {
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
