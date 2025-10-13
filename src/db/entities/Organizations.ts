import { Entity, Enum, Index, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity({ schema: 'core', comment: 'Tenant organizations - each represents a separate business entity' })
export class Organizations {

  [PrimaryKeyProp]?: 'orgId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  orgId!: string & Opt;

  @Index({ name: 'idx_organizations_org_code', expression: 'CREATE INDEX idx_organizations_org_code ON core.organizations USING btree (org_code) WHERE (deleted_at IS NULL)' })
  @Property({ length: 20, unique: 'organizations_org_code_key' })
  orgCode!: string;

  @Property()
  orgName!: string;

  @Property({ nullable: true })
  legalName?: string;

  @Property({ length: 50, nullable: true, comment: 'Nigerian Tax Identification Number (TIN)' })
  taxId?: string;

  @Property({ length: 50, nullable: true, comment: 'VAT registration number if applicable' })
  vatRegistration?: string;

  @Property({ type: 'character', length: 3 })
  baseCurrency: string & Opt = 'NGN';

  @Property({ type: 'integer' })
  fiscalYearStart: number & Opt = 1;

  @Property({ type: 'string', length: 50 })
  timezone: string & Opt = 'Africa/Lagos';

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ length: 100, nullable: true })
  city?: string;

  @Property({ length: 100, nullable: true })
  state?: string;

  @Property({ type: 'character', length: 2 })
  country: string & Opt = 'NG';

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  website?: string;

  @Index({ name: 'idx_organizations_status', expression: 'CREATE INDEX idx_organizations_status ON core.organizations USING btree (status) WHERE (deleted_at IS NULL)' })
  @Enum({ items: () => OrganizationsStatus })
  status: OrganizationsStatus & Opt = OrganizationsStatus.ACTIVE;

  @Property({ length: 50, nullable: true })
  subscriptionTier?: string;

  @Property({ nullable: true })
  subscriptionExpiresAt?: Date;

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

export enum OrganizationsStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}
