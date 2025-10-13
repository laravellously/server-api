"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let OrderService = OrderService_1 = class OrderService {
    temporal;
    logger = new common_1.Logger(OrderService_1.name);
    constructor(temporal) {
        this.temporal = temporal;
    }
    async createOrder(createOrderDto) {
        const orderId = this.generateOrderId();
        const workflowId = `order-workflow-${orderId}`;
        const orderData = {
            orderId,
            totalAmount: this.calculateTotal(createOrderDto.items),
            ...createOrderDto,
        };
        this.logger.log(`Creating order ${orderId} for customer ${createOrderDto.customerId}`);
        try {
            await this.temporal.startWorkflow("processOrderWorkflow", [orderData], {
                workflowId,
                taskQueue: "order-processing",
            });
            this.logger.log(`Order workflow started: ${workflowId}`);
            return {
                orderId,
                workflowId,
            };
        }
        catch (error) {
            this.logger.error(`Failed to start order workflow: ${error.message}`);
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }
    async getOrderStatus(workflowId) {
        try {
            const status = await this.temporal.queryWorkflow(workflowId, "getOrderStatus");
            return status;
        }
        catch (error) {
            this.logger.error(`Failed to get order status for workflow ${workflowId}: ${error.message}`);
            throw new Error(`Failed to get order status: ${error.message}`);
        }
    }
    async getOrderProgress(workflowId) {
        try {
            const progress = await this.temporal.queryWorkflow(workflowId, "getOrderProgress");
            return progress;
        }
        catch (error) {
            this.logger.error(`Failed to get order progress for workflow ${workflowId}: ${error.message}`);
            throw new Error(`Failed to get order progress: ${error.message}`);
        }
    }
    async cancelOrder(workflowId, reason) {
        try {
            await this.temporal.signalWorkflow(workflowId, "cancelOrder", [reason]);
            this.logger.log(`Cancel signal sent to workflow ${workflowId}: ${reason}`);
        }
        catch (error) {
            this.logger.error(`Failed to cancel order ${workflowId}: ${error.message}`);
            throw new Error(`Failed to cancel order: ${error.message}`);
        }
    }
    async updateOrder(workflowId, updates) {
        try {
            await this.temporal.signalWorkflow(workflowId, "updateOrder", [updates]);
            this.logger.log(`Update signal sent to workflow ${workflowId}`);
        }
        catch (error) {
            this.logger.error(`Failed to update order ${workflowId}: ${error.message}`);
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }
    async listActiveOrders() {
        try {
            return [];
        }
        catch (error) {
            this.logger.error(`Failed to list active orders: ${error.message}`);
            throw new Error(`Failed to list active orders: ${error.message}`);
        }
    }
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `ORD-${timestamp}-${random.toUpperCase()}`;
    }
    calculateTotal(items) {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    }
    async createDemoOrder() {
        const demoOrder = {
            customerId: "demo-customer-001",
            customerEmail: "demo@example.com",
            customerName: "Demo Customer",
            items: [
                {
                    productId: "product-1",
                    productName: "Awesome Widget",
                    quantity: 2,
                    price: 29.99,
                },
                {
                    productId: "product-2",
                    productName: "Super Gadget",
                    quantity: 1,
                    price: 79.99,
                },
            ],
            shippingAddress: {
                street: "123 Demo Street",
                city: "Demo City",
                state: "DC",
                zipCode: "12345",
                country: "USA",
            },
            paymentMethod: "credit_card",
        };
        return this.createOrder(demoOrder);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_temporal_core_1.TemporalService])
], OrderService);
//# sourceMappingURL=order.service.js.map