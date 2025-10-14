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
var ProvisionBankAccountsActivity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvisionBankAccountsActivity = void 0;
const common_1 = require("@nestjs/common");
const palmpay_1 = require("../../../core/client/palmpay");
const pouchii_1 = require("../../../core/client/pouchii");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let ProvisionBankAccountsActivity = ProvisionBankAccountsActivity_1 = class ProvisionBankAccountsActivity {
    palmpayService;
    pouchiiService;
    logger = new common_1.Logger(ProvisionBankAccountsActivity_1.name);
    constructor(palmpayService, pouchiiService) {
        this.palmpayService = palmpayService;
        this.pouchiiService = pouchiiService;
    }
    async execute(userId) {
        const [palmpayAccount, pouchiiAccount] = await Promise.all([
            this.createPalmpayAccount(userId),
            this.createPouchiiAccount(userId),
        ]);
        return {
            palmpay: palmpayAccount,
            pouchii: pouchiiAccount,
        };
    }
    async createPalmpayAccount(userId) {
        try {
            const response = await this.palmpayService.createVirtualAccount({
                identityType: 'personal',
                email: 'm@m.co',
                virtualAccountName: 'PJohnson Plc',
                licenseNumber: '22224643750',
                customerName: 'Micheal Johnson'
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
            this.logger.error(`Failed to create PalmPay account for user ${userId}`, error);
            throw error;
        }
    }
    async createPouchiiAccount(userId) {
        try {
            const response = await this.pouchiiService.pouchiiClient.walletservice.rest.api.create.customer.wallet({
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
            });
            const res = response;
            return {
                walletId: res.data.walletId,
                accountNumber: res.data.accountNumber,
                accountName: res.data.accountName,
                bankName: res.data.bank.name,
                currency: res.data.currency.code,
            };
        }
        catch (error) {
            this.logger.error(`Failed to create Pouchii wallet for user ${userId}`, error);
            throw error;
        }
    }
};
exports.ProvisionBankAccountsActivity = ProvisionBankAccountsActivity;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvisionBankAccountsActivity.prototype, "execute", null);
exports.ProvisionBankAccountsActivity = ProvisionBankAccountsActivity = ProvisionBankAccountsActivity_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)(),
    __metadata("design:paramtypes", [palmpay_1.PalmpayService,
        pouchii_1.PouchiiService])
], ProvisionBankAccountsActivity);
//# sourceMappingURL=provision-bank-accounts.activity.js.map