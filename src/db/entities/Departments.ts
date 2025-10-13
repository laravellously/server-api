import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';
import { Users } from './Users';

@Entity({ schema: 'hrm', comment: 'Hierarchical department structure' })
@Unique({ name: 'departments_org_id_department_code_key', properties: ['org', 'departmentCode'] })
export class Departments {

  [PrimaryKeyProp]?: 'departmentId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  departmentId!: string & Opt;

  @Index({ name: 'idx_departments_org', expression: 'CREATE INDEX idx_departments_org ON hrm.departments USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  departmentCode!: string;

  @Property()
  departmentName!: string;

  @Index({ name: 'idx_departments_parent', expression: 'CREATE INDEX idx_departments_parent ON hrm.departments USING btree (parent_department_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Departments, nullable: true })
  parent?: Departments;

  @ManyToOne({ entity: () => Users, nullable: true })
  manager?: Users;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
