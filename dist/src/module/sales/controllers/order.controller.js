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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrderController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../services/order.service");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
let OrderController = OrderController_1 = class OrderController {
    orderService;
    logger = new common_1.Logger(OrderController_1.name);
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(createOrderDto) {
        try {
            this.logger.log(`Creating order for customer: ${createOrderDto.customerId}`);
            const result = await this.orderService.createOrder(createOrderDto);
            return {
                ...result,
                message: "Order created successfully",
            };
        }
        catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`);
            throw new common_1.HttpException(`Failed to create order: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createDemoOrder() {
        try {
            this.logger.log("Creating demo order");
            const result = await this.orderService.createDemoOrder();
            return {
                ...result,
                message: "Demo order created successfully",
            };
        }
        catch (error) {
            this.logger.error(`Failed to create demo order: ${error.message}`);
            throw new common_1.HttpException(`Failed to create demo order: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOrderStatus(workflowId) {
        try {
            this.logger.log(`Getting status for order workflow: ${workflowId}`);
            return await this.orderService.getOrderStatus(workflowId);
        }
        catch (error) {
            this.logger.error(`Failed to get order status: ${error.message}`);
            throw new common_1.HttpException(`Failed to get order status: ${error.message}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getOrderProgress(workflowId) {
        try {
            this.logger.log(`Getting progress for order workflow: ${workflowId}`);
            return await this.orderService.getOrderProgress(workflowId);
        }
        catch (error) {
            this.logger.error(`Failed to get order progress: ${error.message}`);
            throw new common_1.HttpException(`Failed to get order progress: ${error.message}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async cancelOrder(workflowId, body) {
        try {
            this.logger.log(`Cancelling order workflow: ${workflowId}, reason: ${body.reason}`);
            await this.orderService.cancelOrder(workflowId, body.reason);
            return {
                message: "Order cancellation signal sent",
            };
        }
        catch (error) {
            this.logger.error(`Failed to cancel order: ${error.message}`);
            throw new common_1.HttpException(`Failed to cancel order: ${error.message}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateOrder(workflowId, updates) {
        try {
            this.logger.log(`Updating order workflow: ${workflowId}`);
            await this.orderService.updateOrder(workflowId, updates);
            return {
                message: "Order update signal sent",
            };
        }
        catch (error) {
            this.logger.error(`Failed to update order: ${error.message}`);
            throw new common_1.HttpException(`Failed to update order: ${error.message}`, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async listActiveOrders() {
        try {
            this.logger.log("Listing active orders");
            const orders = await this.orderService.listActiveOrders();
            return {
                orders,
                count: orders.length,
            };
        }
        catch (error) {
            this.logger.error(`Failed to list active orders: ${error.message}`);
            throw new common_1.HttpException(`Failed to list active orders: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new order" }),
    (0, swagger_1.ApiBody)({
        description: "Order creation data",
        schema: {
            type: "object",
            properties: {
                customerId: { type: "string", example: "customer-123" },
                customerEmail: { type: "string", example: "customer@example.com" },
                customerName: { type: "string", example: "John Doe" },
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            productId: { type: "string", example: "product-1" },
                            productName: { type: "string", example: "Widget" },
                            quantity: { type: "number", example: 2 },
                            price: { type: "number", example: 29.99 },
                        },
                    },
                },
                shippingAddress: {
                    type: "object",
                    properties: {
                        street: { type: "string", example: "123 Main St" },
                        city: { type: "string", example: "Anytown" },
                        state: { type: "string", example: "ST" },
                        zipCode: { type: "string", example: "12345" },
                        country: { type: "string", example: "USA" },
                    },
                },
                paymentMethod: { type: "string", example: "credit_card" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Order created successfully",
        schema: {
            type: "object",
            properties: {
                orderId: { type: "string", example: "ORD-1703123456789-ABC123DEF" },
                workflowId: {
                    type: "string",
                    example: "order-workflow-ORD-1703123456789-ABC123DEF",
                },
                message: { type: "string", example: "Order created successfully" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid order data" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Failed to create order" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)("demo"),
    (0, swagger_1.ApiOperation)({ summary: "Create a demo order for testing" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Demo order created successfully",
        schema: {
            type: "object",
            properties: {
                orderId: { type: "string" },
                workflowId: { type: "string" },
                message: { type: "string" },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createDemoOrder", null);
__decorate([
    (0, common_1.Get)(":workflowId/status"),
    (0, swagger_1.ApiOperation)({ summary: "Get order status" }),
    (0, swagger_1.ApiParam)({ name: "workflowId", description: "Workflow ID of the order" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Order status retrieved successfully",
        type: "object",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found" }),
    __param(0, (0, common_1.Param)("workflowId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderStatus", null);
__decorate([
    (0, common_1.Get)(":workflowId/progress"),
    (0, swagger_1.ApiOperation)({ summary: "Get order progress" }),
    (0, swagger_1.ApiParam)({ name: "workflowId", description: "Workflow ID of the order" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Order progress retrieved successfully",
        type: "object",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found" }),
    __param(0, (0, common_1.Param)("workflowId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderProgress", null);
__decorate([
    (0, common_1.Delete)(":workflowId"),
    (0, swagger_1.ApiOperation)({ summary: "Cancel an order" }),
    (0, swagger_1.ApiParam)({ name: "workflowId", description: "Workflow ID of the order" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                reason: { type: "string", example: "Customer requested cancellation" },
            },
            required: ["reason"],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Order cancelled successfully",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Order cancellation signal sent" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found" }),
    __param(0, (0, common_1.Param)("workflowId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Patch)(":workflowId"),
    (0, swagger_1.ApiOperation)({ summary: "Update an order" }),
    (0, swagger_1.ApiParam)({ name: "workflowId", description: "Workflow ID of the order" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                customerEmail: { type: "string", example: "newemail@example.com" },
                shippingAddress: {
                    type: "object",
                    properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        zipCode: { type: "string" },
                        country: { type: "string" },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Order updated successfully",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Order update signal sent" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found" }),
    __param(0, (0, common_1.Param)("workflowId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "List active orders" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Active orders retrieved successfully",
        schema: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    workflowId: { type: "string" },
                    status: { type: "string" },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listActiveOrders", null);
exports.OrderController = OrderController = OrderController_1 = __decorate([
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, swagger_1.ApiTags)("orders"),
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map