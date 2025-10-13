import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Employees } from './Employees';
export declare class EmployeeBankAccounts {
    [PrimaryKeyProp]?: 'empBankAccountId';
    empBankAccountId: string & Opt;
    employee: Employees;
    bankName: string;
    accountNumber: string;
    accountName: string;
    bankCode?: string;
    isPrimary: boolean & Opt;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy?: string;
}
