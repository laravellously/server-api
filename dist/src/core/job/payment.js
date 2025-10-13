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
var PaymentActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentActivityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let PaymentActivityService = PaymentActivityService_1 = class PaymentActivityService {
    logger = new common_1.Logger(PaymentActivityService_1.name);
    async processPayment(paymentData) {
        this.logger.log(`Processing payment for order ${paymentData.orderId}, amount: ${paymentData.amount} ${paymentData.currency}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
            const paymentResult = {
                paymentId: `pay_${Date.now()}_${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                status: "SUCCESS",
                transactionId: `txn_${Date.now()}`,
                amount: paymentData.amount,
                currency: paymentData.currency,
            };
            this.logger.log(`Payment successful for order ${paymentData.orderId}: ${paymentResult.paymentId}`);
            return paymentResult;
        }
        else {
            const paymentResult = {
                paymentId: `pay_${Date.now()}_${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                status: "FAILED",
                failureReason: "Insufficient funds",
                amount: paymentData.amount,
                currency: paymentData.currency,
            };
            this.logger.error(`Payment failed for order ${paymentData.orderId}: ${paymentResult.failureReason}`);
            return paymentResult;
        }
    }
    async refundPayment(paymentId, amount) {
        this.logger.log(`Processing refund for payment ${paymentId}, amount: ${amount}`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const refundResult = {
            paymentId: `refund_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            status: "SUCCESS",
            transactionId: `refund_txn_${Date.now()}`,
            amount: amount,
            currency: "USD",
        };
        this.logger.log(`Refund successful for payment ${paymentId}: ${refundResult.paymentId}`);
        return refundResult;
    }
    async verifyPayment(paymentId) {
        this.logger.log(`Verifying payment ${paymentId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const verificationResult = {
            paymentId,
            status: "SUCCESS",
            transactionId: `verified_${Date.now()}`,
            amount: 0,
            currency: "USD",
        };
        this.logger.log(`Payment verification completed for ${paymentId}`);
        return verificationResult;
    }
};
exports.PaymentActivityService = PaymentActivityService;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentActivityService.prototype, "processPayment", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PaymentActivityService.prototype, "refundPayment", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentActivityService.prototype, "verifyPayment", null);
exports.PaymentActivityService = PaymentActivityService = PaymentActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)()
], PaymentActivityService);
//# sourceMappingURL=payment.js.map