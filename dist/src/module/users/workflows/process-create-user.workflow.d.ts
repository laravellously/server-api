import { CreateUserDTO, CreatedUserDTO, ProvisionedAccountsDTO } from '../dto/create-user.dto';
export declare function processCreateUserWorkflow(userData: CreateUserDTO, options?: {
    startOnboarding?: boolean;
}): Promise<{
    user: CreatedUserDTO;
    accounts: ProvisionedAccountsDTO;
    bankRecords: {
        palmpayAccountId: string;
        pouchiiAccountId: string;
        palmpayBankId: string;
        pouchiiBankId: string;
    };
}>;
