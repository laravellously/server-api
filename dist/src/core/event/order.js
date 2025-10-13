"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderProgressQuery = exports.getOrderStatusQuery = exports.updateOrderSignal = exports.cancelOrderSignal = void 0;
exports.processOrderWorkflow = processOrderWorkflow;
const workflow_1 = require("@temporalio/workflow");
exports.cancelOrderSignal = (0, workflow_1.defineSignal)("cancelOrder");
exports.updateOrderSignal = (0, workflow_1.defineSignal)("updateOrder");
exports.getOrderStatusQuery = (0, workflow_1.defineQuery)("getOrderStatus");
exports.getOrderProgressQuery = (0, workflow_1.defineQuery)("getOrderProgress");
const paymentActivities = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "5m",
    retry: {
        maximumAttempts: 3,
        initialInterval: "1s",
        maximumInterval: "10s",
    },
});
const inventoryActivities = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "2m",
    retry: {
        maximumAttempts: 5,
        initialInterval: "500ms",
        maximumInterval: "5s",
    },
});
const emailActivities = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "1m",
    retry: {
        maximumAttempts: 3,
        initialInterval: "1s",
        maximumInterval: "5s",
    },
});
async function processOrderWorkflow(orderData) {
    let orderStatus = {
        orderId: orderData.orderId,
        status: "PENDING",
        currentStep: "Order received",
        reservationIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    let isCancelled = false;
    let cancellationReason = "";
    (0, workflow_1.setHandler)(exports.cancelOrderSignal, (reason) => {
        isCancelled = true;
        cancellationReason = reason;
    });
    (0, workflow_1.setHandler)(exports.updateOrderSignal, (updates) => {
        Object.assign(orderData, updates);
    });
    (0, workflow_1.setHandler)(exports.getOrderStatusQuery, () => orderStatus);
    (0, workflow_1.setHandler)(exports.getOrderProgressQuery, () => {
        const steps = [
            "Order received",
            "Inventory check",
            "Inventory reservation",
            "Payment processing",
            "Payment confirmation",
            "Order confirmation",
            "Shipping preparation",
            "Order shipped",
        ];
        const currentStepIndex = steps.indexOf(orderStatus.currentStep);
        const percentage = ((currentStepIndex + 1) / steps.length) * 100;
        return {
            orderId: orderData.orderId,
            currentStep: currentStepIndex + 1,
            totalSteps: steps.length,
            stepName: orderStatus.currentStep,
            percentage: Math.round(percentage),
            estimatedCompletion: new Date(Date.now() + (steps.length - currentStepIndex - 1) * 2 * 60 * 1000),
        };
    });
    try {
        orderStatus.currentStep = "Inventory check";
        orderStatus.updatedAt = new Date();
        if (isCancelled) {
            throw new Error(`Order cancelled: ${cancellationReason}`);
        }
        const inventoryItems = orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        const inventoryCheck = await inventoryActivities.checkInventory(inventoryItems);
        const unavailableItems = inventoryCheck.filter((check) => !check.available);
        if (unavailableItems.length > 0) {
            throw new Error(`Insufficient inventory for products: ${unavailableItems
                .map((item) => item.productId)
                .join(", ")}`);
        }
        orderStatus.currentStep = "Inventory reservation";
        orderStatus.status = "INVENTORY_RESERVED";
        orderStatus.updatedAt = new Date();
        if (isCancelled) {
            throw new Error(`Order cancelled: ${cancellationReason}`);
        }
        const reservations = await inventoryActivities.reserveInventory(inventoryItems, orderData.orderId);
        const failedReservations = reservations.filter((res) => res.status === "FAILED");
        if (failedReservations.length > 0) {
            throw new Error(`Failed to reserve inventory for products: ${failedReservations
                .map((res) => res.productId)
                .join(", ")}`);
        }
        orderStatus.reservationIds = reservations.map((res) => res.reservationId);
        orderStatus.currentStep = "Payment processing";
        orderStatus.status = "PAYMENT_PROCESSING";
        orderStatus.updatedAt = new Date();
        if (isCancelled) {
            await inventoryActivities.releaseReservation(orderStatus.reservationIds);
            throw new Error(`Order cancelled: ${cancellationReason}`);
        }
        const paymentResult = await paymentActivities.processPayment({
            orderId: orderData.orderId,
            amount: orderData.totalAmount,
            currency: "USD",
            customerId: orderData.customerId,
            paymentMethod: orderData.paymentMethod,
        });
        if (paymentResult.status === "FAILED") {
            await inventoryActivities.releaseReservation(orderStatus.reservationIds);
            throw new Error(`Payment failed: ${paymentResult.failureReason}`);
        }
        orderStatus.paymentId = paymentResult.paymentId;
        orderStatus.currentStep = "Payment confirmation";
        orderStatus.status = "PAYMENT_CONFIRMED";
        orderStatus.updatedAt = new Date();
        await inventoryActivities.confirmReservation(orderStatus.reservationIds);
        orderStatus.currentStep = "Order confirmation";
        orderStatus.status = "CONFIRMED";
        orderStatus.updatedAt = new Date();
        const emailData = {
            orderId: orderData.orderId,
            customerEmail: orderData.customerEmail,
            customerName: orderData.customerName,
            items: orderData.items,
            totalAmount: orderData.totalAmount,
            paymentId: paymentResult.paymentId,
        };
        await emailActivities.sendOrderConfirmation(emailData);
        await emailActivities.sendPaymentConfirmation(emailData);
        orderStatus.currentStep = "Shipping preparation";
        orderStatus.status = "SHIPPING";
        orderStatus.updatedAt = new Date();
        if (isCancelled) {
            await compensateOrder(orderStatus, emailData, cancellationReason);
            throw new Error(`Order cancelled after confirmation: ${cancellationReason}`);
        }
        await (0, workflow_1.sleep)("30s");
        const trackingNumber = `TRK${Date.now()}${Math.random()
            .toString(36)
            .substr(2, 6)
            .toUpperCase()}`;
        orderStatus.trackingNumber = trackingNumber;
        orderStatus.currentStep = "Order shipped";
        orderStatus.status = "SHIPPED";
        orderStatus.updatedAt = new Date();
        await emailActivities.sendShippingNotification({
            ...emailData,
            trackingNumber,
        });
        return orderStatus;
    }
    catch (error) {
        orderStatus.status = isCancelled ? "CANCELLED" : "FAILED";
        orderStatus.cancellationReason = isCancelled
            ? cancellationReason
            : undefined;
        orderStatus.error = error.message;
        orderStatus.updatedAt = new Date();
        if (orderStatus.reservationIds.length > 0) {
            try {
                await inventoryActivities.releaseReservation(orderStatus.reservationIds);
            }
            catch (compensationError) {
                console.error("Failed to release inventory reservations:", compensationError);
            }
        }
        if (orderStatus.paymentId) {
            try {
                await paymentActivities.refundPayment(orderStatus.paymentId, orderData.totalAmount);
            }
            catch (compensationError) {
                console.error("Failed to refund payment:", compensationError);
            }
        }
        if (isCancelled) {
            try {
                const emailData = {
                    orderId: orderData.orderId,
                    customerEmail: orderData.customerEmail,
                    customerName: orderData.customerName,
                    items: orderData.items,
                    totalAmount: orderData.totalAmount,
                };
                await emailActivities.sendOrderCancellation({
                    ...emailData,
                    reason: cancellationReason,
                });
            }
            catch (emailError) {
                console.error("Failed to send cancellation email:", emailError);
            }
        }
        return orderStatus;
    }
}
async function compensateOrder(orderStatus, emailData, reason) {
    try {
        if (orderStatus.paymentId) {
            await paymentActivities.refundPayment(orderStatus.paymentId, emailData.totalAmount);
        }
        await emailActivities.sendOrderCancellation({
            ...emailData,
            reason,
        });
    }
    catch (error) {
        console.error("Compensation failed:", error);
    }
}
//# sourceMappingURL=order.js.map