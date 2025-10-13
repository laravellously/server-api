import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Organizations } from './Organizations';
export declare class PaymentMethods {
    [PrimaryKeyProp]?: 'paymentMethodId';
    paymentMethodId: string & Opt;
    org: Organizations;
    methodCode: string;
    methodName: string;
    methodType: PaymentMethodsMethodType;
    isActive: boolean & Opt;
    createdAt: Date & Opt;
}
export declare enum PaymentMethodsMethodType {
    CASH = "CASH",
    CARD = "CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    MOBILE_MONEY = "MOBILE_MONEY",
    CHEQUE = "CHEQUE",
    CREDIT = "CREDIT",
    OTHER = "OTHER"
}
