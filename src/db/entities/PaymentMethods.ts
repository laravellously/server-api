import { Entity, Enum, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Organizations } from './Organizations';

@Entity({ schema: 'sales', comment: 'Payment methods including mobile money (popular in Nigeria)' })
@Unique({ name: 'payment_methods_org_id_method_code_key', properties: ['org', 'methodCode'] })
export class PaymentMethods {

  [PrimaryKeyProp]?: 'paymentMethodId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  paymentMethodId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_payment_methods_org' })
  org!: Organizations;

  @Property({ length: 50 })
  methodCode!: string;

  @Property({ length: 100 })
  methodName!: string;

  @Enum({ items: () => PaymentMethodsMethodType })
  methodType!: PaymentMethodsMethodType;

  @Property({ type: 'boolean' })
  isActive: boolean & Opt = true;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}

export enum PaymentMethodsMethodType {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CHEQUE = 'CHEQUE',
  CREDIT = 'CREDIT',
  OTHER = 'OTHER',
}
