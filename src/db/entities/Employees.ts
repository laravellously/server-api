import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Departments } from './Departments';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { Positions } from './Positions';
import { Users } from './Users';

@Entity({ schema: 'hrm', comment: 'Employee master with Nigerian statutory identifiers (NIN, BVN, TIN)' })
@Index({ name: 'idx_employees_status', expression: 'CREATE INDEX idx_employees_status ON hrm.employees USING btree (org_id, employment_status) WHERE (deleted_at IS NULL)', properties: ['org', 'employmentStatus'] })
@Unique({ name: 'employees_org_id_employee_number_key', properties: ['org', 'employeeNumber'] })
export class Employees {

  [PrimaryKeyProp]?: 'employeeId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  employeeId!: string & Opt;

  @Index({ name: 'idx_employees_org', expression: 'CREATE INDEX idx_employees_org ON hrm.employees USING btree (org_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @Index({ name: 'idx_employees_user', expression: 'CREATE INDEX idx_employees_user ON hrm.employees USING btree (user_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Users, fieldName: 'user_id', nullable: true })
  user?: Users;

  @Property({ length: 50 })
  employeeNumber!: string;

  @Property({ length: 100 })
  firstName!: string;

  @Property({ length: 100 })
  lastName!: string;

  @Property({ length: 100, nullable: true })
  middleName?: string;

  @Property({ type: 'date', nullable: true })
  dateOfBirth?: string;

  @Enum({ items: () => EmployeesGender, nullable: true })
  gender?: EmployeesGender;

  @Enum({ items: () => EmployeesMaritalStatus, nullable: true })
  maritalStatus?: EmployeesMaritalStatus;

  @Property({ nullable: true })
  email?: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ length: 20, nullable: true })
  mobile?: string;

  @Property({ type: 'text', nullable: true })
  address?: string;

  @Property({ length: 100, nullable: true })
  city?: string;

  @Property({ length: 100, nullable: true })
  state?: string;

  @Property({ type: 'character', length: 2, nullable: true })
  country?: string = 'NG';

  @Property({ length: 20, nullable: true })
  nin?: string;

  @Property({ length: 20, nullable: true })
  bvn?: string;

  @Property({ length: 50, nullable: true })
  taxId?: string;

  @ManyToOne({ entity: () => Positions, fieldName: 'position_id', nullable: true })
  position?: Positions;

  @Index({ name: 'idx_employees_department', expression: 'CREATE INDEX idx_employees_department ON hrm.employees USING btree (department_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Departments, fieldName: 'department_id', nullable: true })
  department?: Departments;

  @Index({ name: 'idx_employees_location', expression: 'CREATE INDEX idx_employees_location ON hrm.employees USING btree (location_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Index({ name: 'idx_employees_manager', expression: 'CREATE INDEX idx_employees_manager ON hrm.employees USING btree (manager_id) WHERE (deleted_at IS NULL)' })
  @ManyToOne({ entity: () => Employees, fieldName: 'manager_id', nullable: true })
  manager?: Employees;

  @Property({ type: 'date' })
  hireDate!: string;

  @Property({ type: 'date', nullable: true })
  terminationDate?: string;

  @Enum({ items: () => EmployeesEmploymentType })
  employmentType: EmployeesEmploymentType & Opt = EmployeesEmploymentType.PERMANENT;

  @Enum({ items: () => EmployeesEmploymentStatus })
  employmentStatus: EmployeesEmploymentStatus & Opt = EmployeesEmploymentStatus.ACTIVE;

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

export enum EmployeesGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum EmployeesMaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum EmployeesEmploymentType {
  PERMANENT = 'permanent',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERN = 'intern',
}

export enum EmployeesEmploymentStatus {
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated',
}
