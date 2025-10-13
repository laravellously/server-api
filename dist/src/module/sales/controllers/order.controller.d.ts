import { OrderStatus, OrderProgress } from "src/core/event";
import { OrderService, type CreateOrderDto } from "../services/order.service";
export declare class OrderController {
    private readonly orderService;
    private readonly logger;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        orderId: string;
        workflowId: string;
    }>;
    createDemoOrder(): Promise<{
        message: string;
        orderId: string;
        workflowId: string;
    }>;
    getOrderStatus(workflowId: string): Promise<OrderStatus>;
    getOrderProgress(workflowId: string): Promise<OrderProgress>;
    cancelOrder(workflowId: string, body: {
        reason: string;
    }): Promise<{
        message: string;
    }>;
    updateOrder(workflowId: string, updates: any): Promise<{
        message: string;
    }>;
    listActiveOrders(): Promise<{
        orders: {
            workflowId: string;
            status: string;
        }[];
        count: number;
    }>;
}
