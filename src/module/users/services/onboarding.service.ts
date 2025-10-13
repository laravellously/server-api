import { PalmpayService } from '@/core/client/palmpay';
import { PouchiiService } from '@/core/client/pouchii';
import { Organizations } from '@/db/entities/Organizations';
import { Users, UsersRole } from '@/db/entities/Users';
import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { password } from 'bun';
import { CreatePouchiiAccountRequest, CreateUserDTO, CreateVirtualAccountRequest, CreateVirtualAccountResponse, PouchiiWalletResponseDTO, ProvisionedAccountsDTO } from '../dto/create-user.dto';
import { StepOneFlowDto, StepTwoFlowDto } from '../dto/onboarding.dto';
import { ChartOfAccounts } from '@/db/entities/ChartOfAccounts';
import { BankAccounts } from '@/db/entities/BankAccounts';
import { AccountTypes } from '@/db/entities/AccountTypes';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    // private readonly temporal: TemporalService,
    private readonly em: EntityManager,
    private readonly palmpayService: PalmpayService,
    private readonly pouchiiService: PouchiiService,
  ) { }

  async processCreateOrg(data: StepOneFlowDto) {
    const org = new Organizations();
    org.orgCode = data.registrationNumber
    org.orgName = data.businessName
    org.subscriptionTier = 'FREE'

    await this.em.persistAndFlush(org);

    // return {
    //   orgId: org.orgId,
    //   orgCode: org.orgCode,
    //   orgName: org.orgName,
    //   baseCurrency: org.baseCurrency,
    //   createdAt: org.createdAt,
    // };
    return org
  }

  async processCreateUser(data: StepOneFlowDto, org: Organizations) {
    const userData: CreateUserDTO = {
      username: faker.internet.username(),
      email: data.email,
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: UsersRole.ORG_ADMIN
    }

    const passwordHash = await password.hash(userData.password);

    const user = new Users();
    user.username = userData.username;
    user.email = userData.email;
    user.passwordHash = passwordHash + '###' + userData.password;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    // user.phone = userData.phone;
    user.role = userData.role;
    user.mustChangePassword = false;
    user.org = org

    await this.em.persistAndFlush(user);

    const palmpayPayload: CreateVirtualAccountRequest = {
      identityType: 'personal',
      licenseNumber: data.bvn,
      virtualAccountName: data.businessName,
      customerName: `${user.firstName} ${user.lastName}`,
      email: `${user.email}`,
      accountReference: `BLUU-${user.username}`
    }

    const pouchiiPayload: CreatePouchiiAccountRequest = {
      customerReference: `BLUU-${user.username}`,
      firstName: `${user.firstName} ${user.lastName}`,
      middleName: '',
      lastName: `${user.firstName} ${user.lastName}`,
      gender: 'Male',
      currency: 'NGN',
      emailAddress: `${user.email}`,
      mobileNumber: '08012345678',
      address: 'Abuja',
      walletName: data.businessName,
      dateOfBirth: '1990-01-01',
      bvn: data.bvn
    }

    const [
      palmpayAccount,
      pouchiiAccount
    ] = await Promise.all([
      this.createPalmpayAccount(palmpayPayload),
      this.createPouchiiAccount(pouchiiPayload),
    ]);

    await this.persistBankRecords(org, {
      palmpay: palmpayAccount,
      pouchii: pouchiiAccount,
    })

    return {
      palmpay: palmpayAccount,
      pouchii: pouchiiAccount,
      user
    };
  }

  // async processCreateUserWorkflow(data: StepOneFlowDto, orgId: string) {
  //   const workflowId = `create-user-${orgId}`

  //   const userData: CreateUserDTO = {
  //     username: faker.internet.username(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     firstName: faker.person.firstName(),
  //     lastName: faker.person.lastName(),
  //     role: UsersRole.ORG_ADMIN
  //   }

  //   try {
  //     await this.temporal.startWorkflow('processCreateUserWorkflow', [userData], {
  //       workflowId,
  //       taskQueue: 'user-queue'
  //     })

  //     this.logger.log(`User workflow started: ${workflowId}`);

  //     return {
  //       orgId,
  //       workflowId
  //     }
  //   } catch (error) {
  //     this.logger.error(`Failed to start user workflow: ${error.message}`);
  //     throw new Error(`Failed to create user: ${error.message}`);
  //   }
  // }

  async processUpdateOrg(data: StepTwoFlowDto) { }

  private async createPalmpayAccount(payload: CreateVirtualAccountRequest) {
    try {
      const response = await this.palmpayService.createVirtualAccount({
        identityType: payload.identityType,
        email: payload.email,
        virtualAccountName: payload.virtualAccountName,
        licenseNumber: payload.licenseNumber,
        customerName: payload.customerName
      })

      const res = response as unknown as CreateVirtualAccountResponse

      return {
        accountId: res.data?.accountReference,
        accountNumber: res.data?.virtualAccountNo,
        accountName: res.data?.virtualAccountName,
        bankName: 'PalmPay',
        currency: 'NGN',
      };
    } catch (error) {
      this.logger.error(
        `Failed to create PalmPay account`,
        error,
      );
      throw error;
    }
  }

  private async createPouchiiAccount(payload: CreatePouchiiAccountRequest) {
    try {
      const response =
        await this.pouchiiService.pouchiiClient.walletservice.rest.api.create.customer.wallet(
          {
            // body: {
            //   customerReference: 'BLUU-08065178330',
            //   firstName: 'Peter',
            //   middleName: 'Michael',
            //   lastName: 'Johnson',
            //   gender: 'Male',
            //   currency: 'NGN',
            //   emailAddress: 'p.johnson@gmail.com',
            //   mobileNumber: '08065178330',
            //   address: 'Festrut Estate, Minna, Niger State',
            //   walletName: 'New PJohnson Plc',
            //   dateOfBirth: '2001-01-10',
            //   bvn: '22224643755',
            // },
            body: payload
          },
        );

      const res = response as unknown as PouchiiWalletResponseDTO

      return {
        walletId: res.data.walletId,
        accountNumber: res.data.walletNumber,
        accountName: res.data.walletName,
        // bankCode: res.data.bank.code,
        bankName: res.data.bank.name,
        currency: res.data.currency.code,
        // walletName: res.data.walletName,
        // walletNumber: res.data.walletNumber,
        // isPrimary: res.data.isPrimaryWallet,
        // status: res.data.walletStatus
      };
    } catch (error) {
      this.logger.error(
        `Failed to create Pouchii wallet`,
        error,
      );
      throw error;
    }
  }

  private async persistBankRecords(org: Organizations, provisionedAccounts: ProvisionedAccountsDTO) {
    const typeCode = 'CASH'
    const accountType = await this.em.findOneOrFail(AccountTypes, { typeCode });
    // Create Chart of Accounts entries
    const palmpayAccount = new ChartOfAccounts();
    palmpayAccount.org = org;
    palmpayAccount.accountCode = provisionedAccounts.palmpay.accountNumber || '';
    palmpayAccount.accountName = provisionedAccounts.palmpay.accountName || '';
    palmpayAccount.isControlAccount = false;
    palmpayAccount.isHeader = false;
    palmpayAccount.isActive = true;
    palmpayAccount.openingBalance = '0';
    palmpayAccount.currentBalance = '0';
    palmpayAccount.accountType = accountType

    const pouchiiAccount = new ChartOfAccounts();
    pouchiiAccount.org = org;
    pouchiiAccount.accountCode = provisionedAccounts.pouchii.accountNumber || '';
    pouchiiAccount.accountName = provisionedAccounts.pouchii.accountName || '';
    pouchiiAccount.isControlAccount = false;
    pouchiiAccount.isHeader = false;
    pouchiiAccount.isActive = true;
    pouchiiAccount.openingBalance = '0';
    pouchiiAccount.currentBalance = '0';
    pouchiiAccount.accountType = accountType

    this.em.persist([palmpayAccount, pouchiiAccount]);

    // Create Bank Account records
    const palmpayBank = new BankAccounts();
    palmpayBank.org = org;
    palmpayBank.account = palmpayAccount;
    palmpayBank.bankName = provisionedAccounts.palmpay.bankName;
    palmpayBank.accountNumber = provisionedAccounts.palmpay.accountNumber || '';
    palmpayBank.accountHolder = provisionedAccounts.palmpay.accountName;
    palmpayBank.currency = 'NGN';
    palmpayBank.currentBalance = '0';
    palmpayBank.isActive = true;

    const pouchiiBank = new BankAccounts();
    pouchiiBank.org = org;
    pouchiiBank.account = pouchiiAccount;
    pouchiiBank.bankName = provisionedAccounts.pouchii.bankName;
    pouchiiBank.accountNumber = provisionedAccounts.pouchii.accountNumber;
    pouchiiBank.accountHolder = provisionedAccounts.pouchii.accountName;
    pouchiiBank.currency = 'NGN';
    pouchiiBank.currentBalance = '0';
    pouchiiBank.isActive = true;

    await this.em.persistAndFlush([palmpayBank, pouchiiBank]);

    return {
      // palmpayAccountId: palmpayAccount.accountId,
      // pouchiiAccountId: pouchiiAccount.accountId,
      palmpayBankId: palmpayBank.bankAccountId,
      pouchiiBankId: pouchiiBank.bankAccountId,
    };
  }
}
