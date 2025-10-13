import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'core', comment: 'System users with role-based access control' })
@Index({ name: 'idx_users_role', expression: 'CREATE INDEX idx_users_role ON core.users USING btree (org_id, role) WHERE (deleted_at IS NULL)', properties: ['org', 'role'] })
export class Users {

  [PrimaryKeyProp]?: 'userId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  userId!: string & Opt;

  @Index({ name: 'idx_users_org_id', expression: 'CREATE INDEX idx_users_org_id ON core.users USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Index({ name: 'idx_users_username', expression: 'CREATE INDEX idx_users_username ON core.users USING btree (username) WHERE (deleted_at IS NULL)' })
  @Property({ length: 100, unique: 'users_username_key' })
  username!: string;

  @Index({ name: 'idx_users_email', expression: 'CREATE INDEX idx_users_email ON core.users USING btree (email) WHERE (deleted_at IS NULL)' })
  @Property()
  email!: string;

  @Property()
  passwordHash!: string;

  @Property({ length: 100 })
  firstName!: string;

  @Property({ length: 100 })
  lastName!: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Enum({ items: () => UsersStatus })
  status: UsersStatus & Opt = UsersStatus.ACTIVE;

  @Enum({ items: () => UsersRole, comment: 'Primary role determines RLS policy enforcement' })
  role!: UsersRole;

  @Index({ name: 'idx_users_default_location', expression: 'CREATE INDEX idx_users_default_location ON core.users USING btree (default_location_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Locations, nullable: true })
  default?: Locations;

  @Property({ nullable: true })
  lastLoginAt?: Date;

  @Property({ columnType: 'inet', nullable: true })
  lastLoginIp?: unknown;

  @Property({ type: 'integer' })
  failedLoginAttempts: number & Opt = 0;

  @Property({ nullable: true })
  passwordChangedAt?: Date;

  @Property({ type: 'boolean' })
  mustChangePassword: boolean & Opt = false;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

  @Property({ type: 'uuid', nullable: true })
  updatedBy?: string;

}

export enum UsersStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  LOCKED = 'locked',
  INACTIVE = 'inactive',
}

export enum UsersRole {
  SUPER_ADMIN = 'super_admin',
  ORG_ADMIN = 'org_admin',
  LOCATION_MANAGER = 'location_manager',
  ACCOUNTANT = 'accountant',
  POS_CASHIER = 'pos_cashier',
  INVENTORY_MANAGER = 'inventory_manager',
  SALES_REP = 'sales_rep',
  HR_MANAGER = 'hr_manager',
  CRM_USER = 'crm_user',
  READONLY_USER = 'readonly_user',
}
