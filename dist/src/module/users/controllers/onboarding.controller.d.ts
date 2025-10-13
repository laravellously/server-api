import { StepOneFlowDto, StepTwoFlowDto } from '../dto/onboarding.dto';
import { OnboardingService } from '../services/onboarding.service';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    stepOneFlow(body: StepOneFlowDto): Promise<{
        message: string;
        status: boolean;
        palmpay: {
            accountId: string | undefined;
            accountNumber: string | undefined;
            accountName: string | undefined;
            bankName: string;
            currency: string;
        };
        pouchii: {
            walletId: number;
            accountNumber: string;
            accountName: string;
            bankName: string;
            currency: string;
        };
        user: import("../../../db/entities/Users").Users;
    }>;
    stepTwoFlow(body: StepTwoFlowDto): Promise<void>;
}
