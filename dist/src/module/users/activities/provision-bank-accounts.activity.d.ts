import { PalmpayService } from '@/core/client/palmpay';
import { PouchiiService } from '@/core/client/pouchii';
import { ProvisionedAccountsDTO } from '../dto/create-user.dto';
export declare class ProvisionBankAccountsActivity {
    private readonly palmpayService;
    private readonly pouchiiService;
    private readonly logger;
    constructor(palmpayService: PalmpayService, pouchiiService: PouchiiService);
    execute(userId: string): Promise<ProvisionedAccountsDTO>;
    private createPalmpayAccount;
    private createPouchiiAccount;
}
