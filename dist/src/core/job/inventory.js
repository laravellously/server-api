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
var InventoryActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryActivityService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let InventoryActivityService = InventoryActivityService_1 = class InventoryActivityService {
    logger = new common_1.Logger(InventoryActivityService_1.name);
    inventory = new Map([
        ["product-1", 100],
        ["product-2", 50],
        ["product-3", 25],
        ["product-4", 75],
        ["product-5", 0],
    ]);
    reservations = new Map();
    async checkInventory(items) {
        this.logger.log(`Checking inventory for ${items.length} items`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const results = items.map((item) => {
            const availableQuantity = this.inventory.get(item.productId) || 0;
            const available = availableQuantity >= item.quantity;
            this.logger.log(`Product ${item.productId}: requested ${item.quantity}, available ${availableQuantity}, sufficient: ${available}`);
            return {
                productId: item.productId,
                available,
                availableQuantity,
                requestedQuantity: item.quantity,
            };
        });
        return results;
    }
    async reserveInventory(items, orderId) {
        this.logger.log(`Reserving inventory for order ${orderId}, ${items.length} items`);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const results = [];
        for (const item of items) {
            const availableQuantity = this.inventory.get(item.productId) || 0;
            if (availableQuantity >= item.quantity) {
                const reservationId = `res_${Date.now()}_${Math.random()
                    .toString(36)
                    .substr(2, 9)}`;
                const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
                this.inventory.set(item.productId, availableQuantity - item.quantity);
                this.reservations.set(reservationId, {
                    productId: item.productId,
                    quantity: item.quantity,
                    orderId,
                    expiresAt,
                });
                results.push({
                    reservationId,
                    productId: item.productId,
                    quantity: item.quantity,
                    expiresAt,
                    status: "RESERVED",
                });
                this.logger.log(`Reserved ${item.quantity} units of ${item.productId} (reservation: ${reservationId})`);
            }
            else {
                results.push({
                    reservationId: "",
                    productId: item.productId,
                    quantity: item.quantity,
                    expiresAt: new Date(),
                    status: "FAILED",
                });
                this.logger.error(`Failed to reserve ${item.quantity} units of ${item.productId} (only ${availableQuantity} available)`);
            }
        }
        return results;
    }
    async releaseReservation(reservationIds) {
        this.logger.log(`Releasing ${reservationIds.length} reservations`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        for (const reservationId of reservationIds) {
            const reservation = this.reservations.get(reservationId);
            if (reservation) {
                const currentQuantity = this.inventory.get(reservation.productId) || 0;
                this.inventory.set(reservation.productId, currentQuantity + reservation.quantity);
                this.reservations.delete(reservationId);
                this.logger.log(`Released reservation ${reservationId} for ${reservation.quantity} units of ${reservation.productId}`);
            }
        }
    }
    async confirmReservation(reservationIds) {
        this.logger.log(`Confirming ${reservationIds.length} reservations`);
        await new Promise((resolve) => setTimeout(resolve, 600));
        for (const reservationId of reservationIds) {
            const reservation = this.reservations.get(reservationId);
            if (reservation) {
                this.reservations.delete(reservationId);
                this.logger.log(`Confirmed reservation ${reservationId} for ${reservation.quantity} units of ${reservation.productId}`);
            }
        }
    }
    async updateInventory(productId, quantity) {
        this.logger.log(`Updating inventory for ${productId}: ${quantity > 0 ? "+" : ""}${quantity}`);
        await new Promise((resolve) => setTimeout(resolve, 400));
        const currentQuantity = this.inventory.get(productId) || 0;
        this.inventory.set(productId, Math.max(0, currentQuantity + quantity));
        this.logger.log(`Inventory updated for ${productId}: new quantity ${this.inventory.get(productId)}`);
    }
};
exports.InventoryActivityService = InventoryActivityService;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], InventoryActivityService.prototype, "checkInventory", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], InventoryActivityService.prototype, "reserveInventory", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], InventoryActivityService.prototype, "releaseReservation", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], InventoryActivityService.prototype, "confirmReservation", null);
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InventoryActivityService.prototype, "updateInventory", null);
exports.InventoryActivityService = InventoryActivityService = InventoryActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)()
], InventoryActivityService);
//# sourceMappingURL=inventory.js.map