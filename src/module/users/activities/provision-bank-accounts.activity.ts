import { Injectable, Logger } from '@nestjs/common';
import { PalmpayService } from '@/core/client/palmpay';
import { PouchiiService } from '@/core/client/pouchii';
import { CreateVirtualAccountResponse, PouchiiWalletResponseDTO, ProvisionedAccountsDTO } from '../dto/create-user.dto';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Injectable()
@Activity()
export class ProvisionBankAccountsActivity {
  private readonly logger = new Logger(ProvisionBankAccountsActivity.name);

  constructor(
    private readonly palmpayService: PalmpayService,
    private readonly pouchiiService: PouchiiService,
  ) {}

  @ActivityMethod()
  async execute(userId: string): Promise<ProvisionedAccountsDTO> {
    const [palmpayAccount, pouchiiAccount] = await Promise.all([
      this.createPalmpayAccount(userId),
      this.createPouchiiAccount(userId),
    ]);

    return {
      palmpay: palmpayAccount,
      pouchii: pouchiiAccount,
    };
  }

  private async createPalmpayAccount(userId: string) {
    try {
      const response = await this.palmpayService.createVirtualAccount({
        identityType: 'personal',
        email: 'm@m.co',
        virtualAccountName: 'PJohnson Plc',
        licenseNumber: '22224643750',
        customerName: 'Micheal Johnson'
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
        `Failed to create PalmPay account for user ${userId}`,
        error,
      );
      throw error;
    }
  }

  private async createPouchiiAccount(userId: string) {
    try {
      const response =
        await this.pouchiiService.pouchiiClient.walletservice.rest.api.create.customer.wallet(
          {
            body: {
              customerReference: 'BLUU-08065178330',
              firstName: 'Peter',
              middleName: 'Michael',
              lastName: 'Johnson',
              gender: 'Male',
              currency: 'NGN',
              emailAddress: 'p.johnson@gmail.com',
              mobileNumber: '08065178330',
              address: 'Festrut Estate, Minna, Niger State',
              walletName: 'PJohnson Plc',
              dateOfBirth: '2001-01-10',
              bvn: '22224643750',
            },
          },
        );

      const res = response as unknown as PouchiiWalletResponseDTO

      return {
        walletId: res.data.walletId,
        accountNumber: res.data.accountNumber,
        accountName: res.data.accountName,
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
        `Failed to create Pouchii wallet for user ${userId}`,
        error,
      );
      throw error;
    }
  }
}
