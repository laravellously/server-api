import { Entity, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'inventory', comment: 'Supplier/vendor master for procurement' })
@Index({ name: 'idx_suppliers_name', expression: 'CREATE INDEX idx_suppliers_name ON inventory.suppliers USING btree (org_id, supplier_name) WHERE (deleted_at IS NULL)', properties: ['org', 'supplierName'] })
@Unique({ name: 'suppliers_org_id_supplier_code_key', properties: ['org', 'supplierCode'] })
export class Suppliers {

  [PrimaryKeyProp]?: 'supplierId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  supplierId!: string & Opt;

  @Index({ name: 'idx_suppliers_org', expression: 'CREATE INDEX idx_suppliers_org ON inventory.suppliers USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Property({ length: 50 })
  supplierCode!: string;

  @Property()
  supplierName!: string;

  @Property({ nullable: true })
  contactPerson?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ length: 100, nullable: true })
  city?: string;

  @Property({ length: 100, nullable: true })
  state?: string;

  @Property({ type: 'character', length: 2, nullable: true })
  country?: string = 'NG';

  @Property({ length: 50, nullable: true })
  taxId?: string;

  @Property({ length: 100, nullable: true })
  paymentTerms?: string;

  @Property({ type: 'decimal', precision: 18, scale: 2, nullable: true, defaultRaw: `0` })
  creditLimit?: string;

  @Property({ type: 'character', length: 3, nullable: true })
  currency?: string = 'NGN';

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
