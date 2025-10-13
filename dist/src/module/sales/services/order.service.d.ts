import { TemporalService } from "nestjs-temporal-core";
import { OrderData, OrderStatus, OrderProgress } from "src/core/event";
export interface CreateOrderDto {
    customerId: string;
    customerEmail: string;
    customerName: string;
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
}
export declare class OrderService {
    private readonly temporal;
    private readonly logger;
    constructor(temporal: TemporalService);
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        orderId: string;
        workflowId: string;
    }>;
    getOrderStatus(workflowId: string): Promise<OrderStatus>;
    getOrderProgress(workflowId: string): Promise<OrderProgress>;
    cancelOrder(workflowId: string, reason: string): Promise<void>;
    updateOrder(workflowId: string, updates: Partial<OrderData>): Promise<void>;
    listActiveOrders(): Promise<Array<{
        workflowId: string;
        status: string;
    }>>;
    private generateOrderId;
    private calculateTotal;
    createDemoOrder(): Promise<{
        orderId: string;
        workflowId: string;
    }>;
}
