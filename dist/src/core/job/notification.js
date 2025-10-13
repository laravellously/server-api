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
var NotificationActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationActivityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let NotificationActivityService = NotificationActivityService_1 = class NotificationActivityService {
    logger = new common_1.Logger(NotificationActivityService_1.name);
    async sendSMS(phoneNumber, message) {
        this.logger.log(`Sending SMS to ${phoneNumber}: ${message}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const isSuccess = Math.random() > 0.05;
        if (isSuccess) {
            const result = {
                notificationId: `sms_${Date.now()}_${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                status: "SENT",
                channel: "SMS",
                sentAt: new Date(),
            };
            this.logger.log(`SMS sent successfully: ${result.notificationId}`);
            return result;
        }
        else {
            const result = {
                notificationId: "",
                status: "FAILED",
                channel: "SMS",
                error: "SMS service temporarily unavailable",
            };
            this.logger.error(`SMS failed: ${result.error}`);
            return result;
        }
    }
    async sendPushNotification(userId, title, body) {
        this.logger.log(`Sending push notification to user ${userId}: ${title}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const result = {
            notificationId: `push_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            status: "SENT",
            channel: "PUSH",
            sentAt: new Date(),
        };
        this.logger.log(`Push notification sent successfully: ${result.notificationId}`);
        return result;
    }
    async sendInAppNotification(userId, notification) {
        this.logger.log(`Sending in-app notification to user ${userId}: ${notification.title}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const result = {
            notificationId: `inapp_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            status: "SENT",
            channel: "IN_APP",
            sentAt: new Date(),
        };
        this.logger.log(`In-app notification sent successfully: ${result.notificationId}`);
        return result;
    }
    async markAsRead(notificationId) {
        this.logger.log(`Marking notification ${notificationId} as read`);
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.logger.log(`Notification ${notificationId} marked as read`);
    }
    async getNotificationHistory(userId) {
        this.logger.log(`Getting notification history for user ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 600));
        const history = [
            {
                userId,
                type: "PUSH",
                title: "Order Update",
                message: "Your order has been processed",
                metadata: { orderId: "ORD-123" },
            },
            {
                userId,
                type: "SMS",
                title: "Payment Confirmation",
                message: "Payment of $29.99 has been processed",
                metadata: { amount: 29.99 },
            },
        ];
        this.logger.log(`Retrieved ${history.length} notifications for user ${userId}`);
        return history;
    }
};
exports.NotificationActivityService = NotificationActivityService;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)("send-sms"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationActivityService.prototype, "sendSMS", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)({
        name: "send-push-notification",
        timeout: "30s",
        maxRetries: 3,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationActivityService.prototype, "sendPushNotification", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationActivityService.prototype, "sendInAppNotification", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)("mark-notification-read"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationActivityService.prototype, "markAsRead", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationActivityService.prototype, "getNotificationHistory", null);
exports.NotificationActivityService = NotificationActivityService = NotificationActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)({ name: "notification-activities" })
], NotificationActivityService);
//# sourceMappingURL=notification.js.map