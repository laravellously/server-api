import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class Attendance {
    [PrimaryKeyProp]?: 'attendanceId';
    attendanceId: string & Opt;
    org: Organizations;
    employee: Employees;
    location?: Locations;
    attendanceDate: string;
    checkInTime?: Date;
    checkOutTime?: Date;
    workHours?: string;
    overtimeHours?: string;
    status: AttendanceStatus & Opt;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
}
export declare enum AttendanceStatus {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late",
    HALF_DAY = "half_day",
    ON_LEAVE = "on_leave",
    HOLIDAY = "holiday"
}
