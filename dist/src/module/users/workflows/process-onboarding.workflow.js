"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOnboardingWorkflow = processOnboardingWorkflow;
const workflow_1 = require("@temporalio/workflow");
const createOrganization = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        maximumAttempts: 3,
        initialInterval: '1 second',
    },
});
const createLocation = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        maximumAttempts: 3,
        initialInterval: '1 second',
    },
});
const createOrgAdminRole = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        maximumAttempts: 3,
        initialInterval: '1 second',
    },
});
async function processOnboardingWorkflow({ userId, organization, location, }) {
    const org = await createOrganization.execute(organization);
    const primaryLocation = await createLocation.execute(org.orgId, {
        ...location,
        isPrimary: true,
    });
    await createOrgAdminRole.execute(userId, primaryLocation.locationId);
    return {
        orgId: org.orgId,
        locationId: primaryLocation.locationId,
    };
}
//# sourceMappingURL=process-onboarding.workflow.js.map