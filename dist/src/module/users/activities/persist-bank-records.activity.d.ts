import { EntityManager } from '@mikro-orm/postgresql';
import type { ProvisionedAccountsDTO } from '../dto/create-user.dto';
export declare class PersistBankRecordsActivity {
    private readonly em;
    constructor(em: EntityManager);
    execute(orgId: string, provisionedAccounts: ProvisionedAccountsDTO): Promise<{
        palmpayAccountId: string & import("@mikro-orm/postgresql").Opt.Brand;
        pouchiiAccountId: string & import("@mikro-orm/postgresql").Opt.Brand;
        palmpayBankId: string & import("@mikro-orm/postgresql").Opt.Brand;
        pouchiiBankId: string & import("@mikro-orm/postgresql").Opt.Brand;
    }>;
}
