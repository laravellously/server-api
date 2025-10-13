import { ApplicationFailure } from '@temporalio/common';
import { proxyActivities, startChild } from '@temporalio/workflow';
import { CreateUserActivity } from '../activities/create-user.activity';
import { PersistBankRecordsActivity } from '../activities/persist-bank-records.activity';
import { ProvisionBankAccountsActivity } from '../activities/provision-bank-accounts.activity';
import { CreateUserDTO, CreatedUserDTO, ProvisionedAccountsDTO } from '../dto/create-user.dto';

const createUser = proxyActivities<CreateUserActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

const provisionBankAccounts = proxyActivities<ProvisionBankAccountsActivity>({
  startToCloseTimeout: '2 minutes',
  retry: {
    maximumAttempts: 5,
    initialInterval: '2 seconds',
    backoffCoefficient: 2,
  },
});

const persistBankRecords = proxyActivities<PersistBankRecordsActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

export async function processCreateUserWorkflow(
  userData: CreateUserDTO,
  options: { startOnboarding?: boolean } = {}
): Promise<{
  user: CreatedUserDTO;
  accounts: ProvisionedAccountsDTO;
  bankRecords: {
    palmpayAccountId: string;
    pouchiiAccountId: string;
    palmpayBankId: string;
    pouchiiBankId: string;
  };
}> {
  // Step 1: Create user in database
  const user = await createUser.execute(userData);

  // Step 2: Provision external bank accounts
  let accounts: ProvisionedAccountsDTO;
  try {
    accounts = await provisionBankAccounts.execute(user.userId);
  } catch (error) {
    throw ApplicationFailure.create({
      message: `Failed to provision bank accounts: ${error.message}`,
      type: 'BANK_ACCOUNT_PROVISIONING_FAILED',
      nonRetryable: true,
      cause: error,
    });
  }

  // Step 3: Persist bank records
  const bankRecords = await persistBankRecords.execute(user.userId, accounts);

  // Step 4: Optionally start onboarding workflow
  if (options.startOnboarding) {
    await startChild('processOnboardingWorkflow', {
      workflowId: `onboarding-${user.userId}`,
      args: [user.userId],
    });
  }

  return { user, accounts, bankRecords };
}