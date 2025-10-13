import { Entity, Enum, Index, ManyToOne, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Locations } from './Locations';
import { Organizations } from './Organizations';

@Entity({ schema: 'hrm', comment: 'Daily employee attendance with check-in/out times' })
@Index({ name: 'idx_attendance_employee', properties: ['employee', 'attendanceDate'] })
@Index({ name: 'idx_attendance_location', properties: ['location', 'attendanceDate'] })
@Index({ name: 'idx_attendance_org_date', properties: ['org', 'attendanceDate'] })
@Unique({ name: 'attendance_org_id_employee_id_attendance_date_key', properties: ['org', 'employee', 'attendanceDate'] })
export class Attendance {

  [PrimaryKeyProp]?: 'attendanceId';

  @PrimaryKey({ type: 'uuid', defaultRaw: `uuid_generate_v4()` })
  attendanceId!: string & Opt;

  @ManyToOne({ entity: () => Organizations, fieldName: 'org_id', deleteRule: 'cascade' })
  org!: Organizations;

  @ManyToOne({ entity: () => Employees, fieldName: 'employee_id', deleteRule: 'cascade' })
  employee!: Employees;

  @ManyToOne({ entity: () => Locations, fieldName: 'location_id', nullable: true })
  location?: Locations;

  @Property({ type: 'date' })
  attendanceDate!: string;

  @Property({ nullable: true })
  checkInTime?: Date;

  @Property({ nullable: true })
  checkOutTime?: Date;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  workHours?: string;

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true, defaultRaw: `0` })
  overtimeHours?: string;

  @Enum({ items: () => AttendanceStatus })
  status: AttendanceStatus & Opt = AttendanceStatus.PRESENT;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  HALF_DAY = 'half_day',
  ON_LEAVE = 'on_leave',
  HOLIDAY = 'holiday',
}
