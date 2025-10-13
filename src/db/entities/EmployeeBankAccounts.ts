import { Entity, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Employees } from './Employees';

@Entity({ schema: 'hrm', comment: 'Employee bank accounts for salary payments' })
export class EmployeeBankAccounts {

  [PrimaryKeyProp]?: 'empBankAccountId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  empBankAccountId!: string & Opt;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade', index: 'idx_emp_bank_accounts_employee' })
  employee!: Employees;

  @Property()
  bankName!: string;

  @Property({ length: 50 })
  accountNumber!: string;

  @Property()
  accountName!: string;

  @Property({ length: 20, nullable: true })
  bankCode?: string;

  @Property({ type: 'boolean' })
  isPrimary: boolean & Opt = false;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'uuid', nullable: true })
  createdBy?: string;

}
