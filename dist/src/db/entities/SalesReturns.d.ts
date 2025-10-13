import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class SalesReturns {
    [PrimaryKeyProp]?: 'returnId';
    returnId: string & Opt;
    org: Organizations;
    location: Locations;
    returnNumber: string;
    returnDate: Date & Opt;
    orderId?: string;
    invoiceId?: string;
    customer: Customers;
    returnReason?: string;
    returnType: SalesReturnsReturnType & Opt;
    currency: string & Opt;
    totalAmount: string & Opt;
    refundAmount: string & Opt;
    returnStatus: SalesReturnsReturnStatus & Opt;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum SalesReturnsReturnType {
    REFUND = "refund",
    EXCHANGE = "exchange",
    CREDIT = "credit"
}
export declare enum SalesReturnsReturnStatus {
    PENDING = "pending",
    APPROVED = "approved",
    COMPLETED = "completed",
    REJECTED = "rejected"
}
