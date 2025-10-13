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
var EmailActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailActivityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let EmailActivityService = EmailActivityService_1 = class EmailActivityService {
    logger = new common_1.Logger(EmailActivityService_1.name);
    async sendOrderConfirmation(orderData) {
        this.logger.log(`Sending order confirmation email for order ${orderData.orderId} to ${orderData.customerEmail}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const emailContent = this.generateOrderConfirmationEmail(orderData);
        const isSuccess = Math.random() > 0.05;
        if (isSuccess) {
            const result = {
                messageId: `msg_${Date.now()}_${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                status: "SENT",
                recipient: orderData.customerEmail,
                sentAt: new Date(),
            };
            this.logger.log(`Order confirmation email sent successfully: ${result.messageId}`);
            return result;
        }
        else {
            const result = {
                messageId: "",
                status: "FAILED",
                recipient: orderData.customerEmail,
                sentAt: new Date(),
                error: "SMTP server temporarily unavailable",
            };
            this.logger.error(`Failed to send order confirmation email: ${result.error}`);
            return result;
        }
    }
    async sendPaymentConfirmation(orderData) {
        this.logger.log(`Sending payment confirmation email for order ${orderData.orderId} to ${orderData.customerEmail}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const emailContent = this.generatePaymentConfirmationEmail(orderData);
        const result = {
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: "SENT",
            recipient: orderData.customerEmail,
            sentAt: new Date(),
        };
        this.logger.log(`Payment confirmation email sent successfully: ${result.messageId}`);
        return result;
    }
    async sendShippingNotification(orderData) {
        this.logger.log(`Sending shipping notification for order ${orderData.orderId} to ${orderData.customerEmail}`);
        await new Promise((resolve) => setTimeout(resolve, 900));
        const emailContent = this.generateShippingNotificationEmail(orderData);
        const result = {
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: "SENT",
            recipient: orderData.customerEmail,
            sentAt: new Date(),
        };
        this.logger.log(`Shipping notification sent successfully: ${result.messageId}`);
        return result;
    }
    async sendOrderCancellation(orderData) {
        this.logger.log(`Sending order cancellation email for order ${orderData.orderId} to ${orderData.customerEmail}`);
        await new Promise((resolve) => setTimeout(resolve, 700));
        const emailContent = this.generateOrderCancellationEmail(orderData);
        const result = {
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: "SENT",
            recipient: orderData.customerEmail,
            sentAt: new Date(),
        };
        this.logger.log(`Order cancellation email sent successfully: ${result.messageId}`);
        return result;
    }
    async sendInventoryAlert(productId, currentStock) {
        this.logger.log(`Sending inventory alert for product ${productId} (stock: ${currentStock})`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const result = {
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: "SENT",
            recipient: "inventory@example.com",
            sentAt: new Date(),
        };
        this.logger.log(`Inventory alert sent successfully: ${result.messageId}`);
        return result;
    }
    generateOrderConfirmationEmail(orderData) {
        return `
      Subject: Order Confirmation - ${orderData.orderId}
      
      Dear ${orderData.customerName},
      
      Thank you for your order! We've received your order and are processing it.
      
      Order Details:
      Order ID: ${orderData.orderId}
      Total Amount: $${orderData.totalAmount.toFixed(2)}
      
      Items:
      ${orderData.items
            .map((item) => `- ${item.productName} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
            .join("\n")}
      
      We'll send you another email when your order ships.
      
      Best regards,
      The Order Team
    `;
    }
    generatePaymentConfirmationEmail(orderData) {
        return `
      Subject: Payment Confirmed - ${orderData.orderId}
      
      Dear ${orderData.customerName},
      
      Your payment has been successfully processed!
      
      Order ID: ${orderData.orderId}
      Payment ID: ${orderData.paymentId}
      Amount Paid: $${orderData.totalAmount.toFixed(2)}
      
      Your order is now being prepared for shipment.
      
      Best regards,
      The Payment Team
    `;
    }
    generateShippingNotificationEmail(orderData) {
        return `
      Subject: Your Order Has Shipped - ${orderData.orderId}
      
      Dear ${orderData.customerName},
      
      Great news! Your order has been shipped.
      
      Order ID: ${orderData.orderId}
      Tracking Number: ${orderData.trackingNumber}
      
      You can track your package using the tracking number above.
      
      Best regards,
      The Shipping Team
    `;
    }
    generateOrderCancellationEmail(orderData) {
        return `
      Subject: Order Cancellation - ${orderData.orderId}
      
      Dear ${orderData.customerName},
      
      We're sorry to inform you that your order has been cancelled.
      
      Order ID: ${orderData.orderId}
      Cancellation Reason: ${orderData.reason}
      
      If payment was processed, a refund will be issued within 3-5 business days.
      
      Best regards,
      The Customer Service Team
    `;
    }
};
exports.EmailActivityService = EmailActivityService;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailActivityService.prototype, "sendOrderConfirmation", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailActivityService.prototype, "sendPaymentConfirmation", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailActivityService.prototype, "sendShippingNotification", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailActivityService.prototype, "sendOrderCancellation", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EmailActivityService.prototype, "sendInventoryAlert", null);
exports.EmailActivityService = EmailActivityService = EmailActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)()
], EmailActivityService);
//# sourceMappingURL=email.js.map