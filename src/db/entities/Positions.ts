import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Departments } from './Departments';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Job positions/titles within organization' })
@Unique({ name: 'positions_org_id_position_code_key', properties: ['org', 'positionCode'] })
export class Positions {

  [PrimaryKeyProp]?: 'positionId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  positionId!: string & Opt;

  @Index({ name: 'idx_positions_org', expression: 'CREATE INDEX idx_positions_org ON hrm.positions USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  positionCode!: string;

  @Property()
  positionTitle!: string;

  @Index({ name: 'idx_positions_department', expression: 'CREATE INDEX idx_positions_department ON hrm.positions USING btree (department_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Departments, fieldName: 'department_id', nullable: true })
  department?: Departments;

  @Property({ length: 20, nullable: true })
  gradeLevel?: string;

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
