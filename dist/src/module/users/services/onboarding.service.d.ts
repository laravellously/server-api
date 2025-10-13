import { PalmpayService } from '@/core/client/palmpay';
import { PouchiiService } from '@/core/client/pouchii';
import { Organizations } from '@/db/entities/Organizations';
import { Users } from '@/db/entities/Users';
import { EntityManager } from '@mikro-orm/postgresql';
import { StepOneFlowDto, StepTwoFlowDto } from '../dto/onboarding.dto';
export declare class OnboardingService {
    private readonly em;
    private readonly palmpayService;
    private readonly pouchiiService;
    private readonly logger;
    constructor(em: EntityManager, palmpayService: PalmpayService, pouchiiService: PouchiiService);
    processCreateOrg(data: StepOneFlowDto): Promise<Organizations>;
    processCreateUser(data: StepOneFlowDto, org: Organizations): Promise<{
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
        user: Users;
    }>;
    processUpdateOrg(data: StepTwoFlowDto): Promise<void>;
    private createPalmpayAccount;
    private createPouchiiAccount;
    private persistBankRecords;
}
