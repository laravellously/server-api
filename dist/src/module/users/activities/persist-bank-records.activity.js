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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistBankRecordsActivity = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const BankAccounts_1 = require("@/db/entities/BankAccounts");
const ChartOfAccounts_1 = require("@/db/entities/ChartOfAccounts");
const Organizations_1 = require("@/db/entities/Organizations");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let PersistBankRecordsActivity = class PersistBankRecordsActivity {
    em;
    constructor(em) {
        this.em = em;
    }
    async execute(orgId, provisionedAccounts) {
        const org = await this.em.findOneOrFail(Organizations_1.Organizations, { orgId });
        const palmpayAccount = new ChartOfAccounts_1.ChartOfAccounts();
        palmpayAccount.org = org;
        palmpayAccount.accountCode = 'PALMPAY_VIRTUAL';
        palmpayAccount.accountName = 'PalmPay Virtual Account';
        palmpayAccount.currency = provisionedAccounts.palmpay.currency;
        palmpayAccount.isControlAccount = false;
        palmpayAccount.isHeader = false;
        palmpayAccount.isActive = true;
        palmpayAccount.openingBalance = '0';
        palmpayAccount.currentBalance = '0';
        const pouchiiAccount = new ChartOfAccounts_1.ChartOfAccounts();
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
            palmpayAccountId: palmpayAccount.accountId,
            pouchiiAccountId: pouchiiAccount.accountId,
            palmpayBankId: palmpayBank.bankAccountId,
            pouchiiBankId: pouchiiBank.bankAccountId,
        };
    }
};
exports.PersistBankRecordsActivity = PersistBankRecordsActivity;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PersistBankRecordsActivity.prototype, "execute", null);
exports.PersistBankRecordsActivity = PersistBankRecordsActivity = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], PersistBankRecordsActivity);
//# sourceMappingURL=persist-bank-records.activity.js.map