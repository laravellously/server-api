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
exports.CreateOrganizationActivity = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const Organizations_1 = require("../../../db/entities/Organizations");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let CreateOrganizationActivity = class CreateOrganizationActivity {
    em;
    constructor(em) {
        this.em = em;
    }
    async execute(data) {
        const org = new Organizations_1.Organizations();
        org.orgCode = data.orgCode;
        org.orgName = data.orgName;
        org.legalName = data.legalName;
        org.baseCurrency = data.baseCurrency || 'NGN';
        org.timezone = data.timezone || 'Africa/Lagos';
        org.country = data.country || 'NG';
        org.email = data.email;
        org.phone = data.phone;
        org.subscriptionTier = 'FREE';
        await this.em.persistAndFlush(org);
        return {
            orgId: org.orgId,
            orgCode: org.orgCode,
            orgName: org.orgName,
            baseCurrency: org.baseCurrency,
            createdAt: org.createdAt,
        };
    }
};
exports.CreateOrganizationActivity = CreateOrganizationActivity;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateOrganizationActivity.prototype, "execute", null);
exports.CreateOrganizationActivity = CreateOrganizationActivity = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], CreateOrganizationActivity);
//# sourceMappingURL=create-organization.activity.js.map