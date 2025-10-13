import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { BankAccounts } from '@/db/entities/BankAccounts';
import { ChartOfAccounts } from '@/db/entities/ChartOfAccounts';
import type { ProvisionedAccountsDTO } from '../dto/create-user.dto';
import { Organizations } from '@/db/entities/Organizations';
import { Activity, ActivityMethod } from 'nestjs-temporal-core';

@Injectable()
@Activity()
export class PersistBankRecordsActivity {
  constructor(private readonly em: EntityManager) {}

  @ActivityMethod()
  async execute(orgId: string, provisionedAccounts: ProvisionedAccountsDTO) {
    const org = await this.em.findOneOrFail(Organizations, { orgId });

    // Create Chart of Accounts entries
    const palmpayAccount = new ChartOfAccounts();
    palmpayAccount.org = org;
    palmpayAccount.accountCode = 'PALMPAY_VIRTUAL';
    palmpayAccount.accountName = 'PalmPay Virtual Account';
    palmpayAccount.currency = provisionedAccounts.palmpay.currency;
    palmpayAccount.isControlAccount = false;
    palmpayAccount.isHeader = false;
    palmpayAccount.isActive = true;
    palmpayAccount.openingBalance = '0';
    palmpayAccount.currentBalance = '0';

    const pouchiiAccount = new ChartOfAccounts();
    pouchiiAccount.org = org;
    pouchiiAccount.accountCode = 'POUCHII_WALLET';
    pouchiiAccount.accountName = 'Pouchii Wallet';
    pouchiiAccount.currency = provisionedAccounts.pouchii.currency;
    pouchiiAccount.isControlAccount = false;
    pouchiiAccount.isHeader = false;
    pouchiiAccount.isActive = true;
    pouchiiAccount.openingBalance = '0';
    pouchiiAccount.currentBalance = '0';

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
      palmpayAccountId: palmpayAccount.accountId,
      pouchiiAccountId: pouchiiAccount.accountId,
      palmpayBankId: palmpayBank.bankAccountId,
      pouchiiBankId: pouchiiBank.bankAccountId,
    };
  }
}