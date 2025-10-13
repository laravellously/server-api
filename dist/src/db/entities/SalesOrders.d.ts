import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Channels } from './Channels';
import { Customers } from './Customers';
import { Locations } from './Locations';
import { Organizations } from './Organizations';
import { PriceLists } from './PriceLists';
import { Users } from './Users';
export declare class SalesOrders {
    [PrimaryKeyProp]?: ['orderId', 'org', 'orderDate'];
    orderId: string & Opt;
    org: Organizations;
    location: Locations;
    channel: Channels;
    orderNumber: string;
    orderDate: Date & Opt;
    customer: Customers;
    priceList?: PriceLists;
    orderStatus: SalesOrdersOrderStatus & Opt;
    currency: string & Opt;
    exchangeRate?: string;
    subtotal: string & Opt;
    discountAmount: string & Opt;
    taxAmount: string & Opt;
    totalAmount: string & Opt;
    paidAmount: string & Opt;
    balanceDue?: string;
    notes?: string;
    salesperson?: Users;
    createdAt: Date & Opt;
    updatedAt: Date & Opt;
    createdBy: string;
    updatedBy?: string;
}
export declare enum SalesOrdersOrderStatus {
    DRAFT = "draft",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    READY = "ready",
    DISPATCHED = "dispatched",
    DELIVERED = "delivered",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
