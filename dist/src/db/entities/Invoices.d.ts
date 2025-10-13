import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
export declare class Invoices {
    [PrimaryKeyProp]?: ['invoiceId', 'org', 'invoiceDate'];
    invoiceId: string & Opt;
    org: Organizations;
    location: Locations;
    invoiceNumber: string;
    invoiceDate: Date & Opt;
    dueDate?: string;
    orderId?: string;
    customer: Customers;
    invoiceStatus: InvoicesInvoiceStatus & Opt;
    currency: string & Opt;
    exchangeRate?: string;
    subtotal: string & Opt;
    discountAmount: string & Opt;
    taxAmount: string & Opt;
    totalAmount: string & Opt;
    paidAmount: string & Opt;
    balanceDue?: string;
    notes?: string;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum InvoicesInvoiceStatus {
    DRAFT = "draft",
    SENT = "sent",
    VIEWED = "viewed",
    PARTIAL = "partial",
    PAID = "paid",
    OVERDUE = "overdue",
    VOID = "void",
    CANCELLED = "cancelled"
}
