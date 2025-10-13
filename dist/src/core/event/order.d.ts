export declare const cancelOrderSignal: import("@temporalio/workflow").SignalDefinition<[string], string>;
export declare const updateOrderSignal: import("@temporalio/workflow").SignalDefinition<[Partial<OrderData>], string>;
export declare const getOrderStatusQuery: import("@temporalio/workflow").QueryDefinition<OrderStatus, [], string>;
export declare const getOrderProgressQuery: import("@temporalio/workflow").QueryDefinition<OrderProgress, [], string>;
export interface OrderData {
    orderId: string;
    customerId: string;
    customerEmail: string;
    customerName: string;
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
}
export interface OrderStatus {
    orderId: string;
    status: "PENDING" | "PAYMENT_PROCESSING" | "PAYMENT_CONFIRMED" | "INVENTORY_RESERVED" | "CONFIRMED" | "SHIPPING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "FAILED";
    currentStep: string;
    paymentId?: string;
    reservationIds: string[];
    trackingNumber?: string;
    cancellationReason?: string;
    error?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderProgress {
    orderId: string;
    currentStep: number;
    totalSteps: number;
    stepName: string;
    percentage: number;
    estimatedCompletion?: Date;
}
export declare function processOrderWorkflow(orderData: OrderData): Promise<OrderStatus>;
