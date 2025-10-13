export interface EmailData {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
}
export interface EmailResult {
    messageId: string;
    status: "SENT" | "FAILED";
    recipient: string;
    sentAt: Date;
    error?: string;
}
export interface OrderEmailData {
    orderId: string;
    customerEmail: string;
    customerName: string;
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    paymentId?: string;
}
export interface EmailActivities {
    sendOrderConfirmation(orderData: OrderEmailData): Promise<EmailResult>;
    sendPaymentConfirmation(orderData: OrderEmailData): Promise<EmailResult>;
    sendShippingNotification(orderData: OrderEmailData & {
        trackingNumber: string;
    }): Promise<EmailResult>;
    sendOrderCancellation(orderData: OrderEmailData & {
        reason: string;
    }): Promise<EmailResult>;
    sendInventoryAlert(productId: string, currentStock: number): Promise<EmailResult>;
}
export declare class EmailActivityService implements EmailActivities {
    private readonly logger;
    sendOrderConfirmation(orderData: OrderEmailData): Promise<EmailResult>;
    sendPaymentConfirmation(orderData: OrderEmailData): Promise<EmailResult>;
    sendShippingNotification(orderData: OrderEmailData & {
        trackingNumber: string;
    }): Promise<EmailResult>;
    sendOrderCancellation(orderData: OrderEmailData & {
        reason: string;
    }): Promise<EmailResult>;
    sendInventoryAlert(productId: string, currentStock: number): Promise<EmailResult>;
    private generateOrderConfirmationEmail;
    private generatePaymentConfirmationEmail;
    private generateShippingNotificationEmail;
    private generateOrderCancellationEmail;
}
