import { CreateLocationDTO, CreateOrganizationDTO } from '../dto/create-user.dto';
interface OnboardingWorkflowInput {
    userId: string;
    organization: CreateOrganizationDTO;
    location: CreateLocationDTO;
}
export declare function processOnboardingWorkflow({ userId, organization, location, }: OnboardingWorkflowInput): Promise<{
    orgId: string;
    locationId: string;
}>;
export {};
