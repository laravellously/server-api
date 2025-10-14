"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OnboardingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const palmpay_1 = require("../../../core/client/palmpay");
const pouchii_1 = require("../../../core/client/pouchii");
const Organizations_1 = require("../../../db/entities/Organizations");
const Users_1 = require("../../../db/entities/Users");
const faker_1 = require("@faker-js/faker");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const bun_1 = require("bun");
const ChartOfAccounts_1 = require("../../../db/entities/ChartOfAccounts");
const BankAccounts_1 = require("../../../db/entities/BankAccounts");
const AccountTypes_1 = require("../../../db/entities/AccountTypes");
let OnboardingService = OnboardingService_1 = class OnboardingService {
    em;
    palmpayService;
    pouchiiService;
    logger = new common_1.Logger(OnboardingService_1.name);
    constructor(em, palmpayService, pouchiiService) {
        this.em = em;
        this.palmpayService = palmpayService;
        this.pouchiiService = pouchiiService;
    }
    async processCreateOrg(data) {
        const org = new Organizations_1.Organizations();
        org.orgCode = data.registrationNumber;
        org.orgName = data.businessName;
        org.subscriptionTier = 'FREE';
        await this.em.persistAndFlush(org);
        return org;
    }
    async processCreateUser(data, org) {
        const userData = {
            username: faker_1.faker.internet.username(),
            email: data.email,
            password: faker_1.faker.internet.password(),
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            role: Users_1.UsersRole.ORG_ADMIN
        };
        const passwordHash = await bun_1.password.hash(userData.password);
        const user = new Users_1.Users();
        user.username = userData.username;
        user.email = userData.email;
        user.passwordHash = passwordHash + '###' + userData.password;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.role = userData.role;
        user.mustChangePassword = false;
        user.org = org;
        await this.em.persistAndFlush(user);
        const palmpayPayload = {
            identityType: 'personal',
            licenseNumber: data.bvn,
            virtualAccountName: data.businessName,
            customerName: `${user.firstName} ${user.lastName}`,
            email: `${user.email}`,
            accountReference: `BLUU-${user.username}`
        };
        const pouchiiPayload = {
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
        };
        const [palmpayAccount, pouchiiAccount] = await Promise.all([
            this.createPalmpayAccount(palmpayPayload),
            this.createPouchiiAccount(pouchiiPayload),
        ]);
        await this.persistBankRecords(org, {
            palmpay: palmpayAccount,
            pouchii: pouchiiAccount,
        });
        return {
            palmpay: palmpayAccount,
            pouchii: pouchiiAccount,
            user
        };
    }
    async processUpdateOrg(data) { }
    async createPalmpayAccount(payload) {
        try {
            const response = await this.palmpayService.createVirtualAccount({
                identityType: payload.identityType,
                email: payload.email,
                virtualAccountName: payload.virtualAccountName,
                licenseNumber: payload.licenseNumber,
                customerName: payload.customerName
            });
            const res = response;
            return {
                accountId: res.data?.accountReference,
                accountNumber: res.data?.virtualAccountNo,
                accountName: res.data?.virtualAccountName,
                bankName: 'PalmPay',
                currency: 'NGN',
            };
        }
        catch (error) {
            this.logger.error(`Failed to create PalmPay account`, error);
            throw error;
        }
    }
    async createPouchiiAccount(payload) {
        try {
            const response = await this.pouchiiService.pouchiiClient.walletservice.rest.api.create.customer.wallet({
                body: payload
            });
            const res = response;
            return {
                walletId: res.data.walletId,
                accountNumber: res.data.walletNumber,
                accountName: res.data.walletName,
                bankName: res.data.bank.name,
                currency: res.data.currency.code,
            };
        }
        catch (error) {
            this.logger.error(`Failed to create Pouchii wallet`, error);
            throw error;
        }
    }
    async persistBankRecords(org, provisionedAccounts) {
        const typeCode = 'CASH';
        const accountType = await this.em.findOneOrFail(AccountTypes_1.AccountTypes, { typeCode });
        const palmpayAccount = new ChartOfAccounts_1.ChartOfAccounts();
        palmpayAccount.org = org;
        palmpayAccount.accountCode = provisionedAccounts.palmpay.accountNumber || '';
        palmpayAccount.accountName = provisionedAccounts.palmpay.accountName || '';
        palmpayAccount.isControlAccount = false;
        palmpayAccount.isHeader = false;
        palmpayAccount.isActive = true;
        palmpayAccount.openingBalance = '0';
        palmpayAccount.currentBalance = '0';
        palmpayAccount.accountType = accountType;
        const pouchiiAccount = new ChartOfAccounts_1.ChartOfAccounts();
        pouchiiAccount.org = org;
        pouchiiAccount.accountCode = provisionedAccounts.pouchii.accountNumber || '';
        pouchiiAccount.accountName = provisionedAccounts.pouchii.accountName || '';
        pouchiiAccount.isControlAccount = false;
        pouchiiAccount.isHeader = false;
        pouchiiAccount.isActive = true;
        pouchiiAccount.openingBalance = '0';
        pouchiiAccount.currentBalance = '0';
        pouchiiAccount.accountType = accountType;
        this.em.persist([palmpayAccount, pouchiiAccount]);
        const palmpayBank = new BankAccounts_1.BankAccounts();
        palmpayBank.org = org;
        palmpayBank.account = palmpayAccount;
        palmpayBank.bankName = provisionedAccounts.palmpay.bankName;
        palmpayBank.accountNumber = provisionedAccounts.palmpay.accountNumber || '';
        palmpayBank.accountHolder = provisionedAccounts.palmpay.accountName;
        palmpayBank.currency = 'NGN';
        palmpayBank.currentBalance = '0';
        palmpayBank.isActive = true;
        const pouchiiBank = new BankAccounts_1.BankAccounts();
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
            palmpayBankId: palmpayBank.bankAccountId,
            pouchiiBankId: pouchiiBank.bankAccountId,
        };
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = OnboardingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        palmpay_1.PalmpayService,
        pouchii_1.PouchiiService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map