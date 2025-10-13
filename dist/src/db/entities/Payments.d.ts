import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { PaymentMethods } from './PaymentMethods';
export declare class Payments {
    [PrimaryKeyProp]?: ['paymentId', 'org', 'paymentDate'];
    paymentId: string & Opt;
    org: Organizations;
    location: Locations;
    paymentNumber: string;
    paymentDate: Date & Opt;
    customer: Customers;
    paymentMethod: PaymentMethods;
    invoiceId?: string;
    referenceNumber?: string;
    currency: string & Opt;
    exchangeRate?: string;
    amount: string;
    amountBaseCurrency?: string;
    paymentStatus: PaymentsPaymentStatus & Opt;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum PaymentsPaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REVERSED = "reversed"
}
