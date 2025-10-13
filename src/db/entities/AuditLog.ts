import { Entity, Enum, Index, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity({ schema: 'audit', comment: 'Comprehensive audit trail for all data changes, partitioned by time' })
@Index({ name: 'idx_audit_log_org_table', properties: ['orgId', 'tableSchema', 'tableName', 'performedAt'] })
@Index({ name: 'idx_audit_log_record', properties: ['recordId', 'performedAt'] })
@Index({ name: 'idx_audit_log_user', properties: ['performedBy', 'performedAt'] })
export class AuditLog {

  [PrimaryKeyProp]?: ['auditId', 'orgId', 'performedAt'];

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  auditId!: string & Opt;

  @PrimaryKey({ type: 'uuid' })
  orgId!: string;

  @Property({ length: 50 })
  tableSchema!: string;

  @Property({ length: 100 })
  tableName!: string;

  @Enum({ items: () => AuditLogOperation })
  operation!: AuditLogOperation;

  @Property({ type: 'uuid' })
  recordId!: string;

  @Property({ type: 'json', nullable: true })
  oldData?: any;

  @Property({ type: 'json', nullable: true })
  newData?: any;

  @Property({ nullable: true })
  changedFields?: string[];

  @PrimaryKey({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  performedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  performedBy?: string;

  @Property({ columnType: 'inet', nullable: true })
  ipAddress?: unknown;

  @Property({ type: 'text', nullable: true })
  userAgent?: string;

}

export enum AuditLogOperation {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
