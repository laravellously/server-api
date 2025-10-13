import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Invoices } from './Invoices';
import { Products } from './Products';
import { TaxConfigs } from './TaxConfigs';
export declare class InvoiceLines {
    [PrimaryKeyProp]?: 'invoiceLineId';
    invoiceLineId: string & Opt;
    lineNumber: number;
    product?: Products;
    description?: string;
    quantity: string;
    unitPrice: string;
    discountAmount?: string;
    lineSubtotal?: string;
    taxConfig?: TaxConfigs;
    taxAmount?: string;
    lineTotal?: string;
    createdAt: Date & Opt;
    'sales.invoices': Invoices;
}
