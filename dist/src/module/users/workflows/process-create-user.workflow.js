"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCreateUserWorkflow = processCreateUserWorkflow;
const common_1 = require("@temporalio/common");
const workflow_1 = require("@temporalio/workflow");
const createUser = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        maximumAttempts: 3,
        initialInterval: '1 second',
    },
});
const provisionBankAccounts = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '2 minutes',
    retry: {
        maximumAttempts: 5,
        initialInterval: '2 seconds',
        backoffCoefficient: 2,
    },
});
const persistBankRecords = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        maximumAttempts: 3,
        initialInterval: '1 second',
    },
});
async function processCreateUserWorkflow(userData, options = {}) {
    const user = await createUser.execute(userData);
    let accounts;
    try {
        accounts = await provisionBankAccounts.execute(user.userId);
    }
    catch (error) {
        throw common_1.ApplicationFailure.create({
            message: `Failed to provision bank accounts: ${error.message}`,
            type: 'BANK_ACCOUNT_PROVISIONING_FAILED',
            nonRetryable: true,
            cause: error,
        });
    }
    const bankRecords = await persistBankRecords.execute(user.userId, accounts);
    if (options.startOnboarding) {
        await (0, workflow_1.startChild)('processOnboardingWorkflow', {
            workflowId: `onboarding-${user.userId}`,
            args: [user.userId],
        });
    }
    return { user, accounts, bankRecords };
}
//# sourceMappingURL=process-create-user.workflow.js.map