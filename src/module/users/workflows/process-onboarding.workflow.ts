import { proxyActivities } from '@temporalio/workflow';
import { CreateLocationActivity } from '../activities/create-location.activity';
import { CreateOrgAdminRoleActivity } from '../activities/create-org-admin-role.activity';
import { CreateOrganizationActivity } from '../activities/create-organization.activity';
import { CreateLocationDTO, CreateOrganizationDTO } from '../dto/create-user.dto';

const createOrganization = proxyActivities<CreateOrganizationActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

const createLocation = proxyActivities<CreateLocationActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

const createOrgAdminRole = proxyActivities<CreateOrgAdminRoleActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

interface OnboardingWorkflowInput {
  userId: string;
  organization: CreateOrganizationDTO;
  location: CreateLocationDTO;
}

export async function processOnboardingWorkflow({
  userId,
  organization,
  location,
}: OnboardingWorkflowInput): Promise<{
  orgId: string;
  locationId: string;
}> {
  // Step 1: Create organization
  const org = await createOrganization.execute(organization);

  // Step 2: Create primary location
  const primaryLocation = await createLocation.execute(org.orgId, {
    ...location,
    isPrimary: true,
  });

  // Step 3: Set up admin role and location access
  await createOrgAdminRole.execute(userId, primaryLocation.locationId);

  return {
    orgId: org.orgId,
    locationId: primaryLocation.locationId,
  };
}