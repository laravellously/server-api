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
exports.CreateLocationActivity = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const Locations_1 = require("../../../db/entities/Locations");
const Organizations_1 = require("../../../db/entities/Organizations");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
let CreateLocationActivity = class CreateLocationActivity {
    em;
    constructor(em) {
        this.em = em;
    }
    async execute(orgId, data) {
        const org = await this.em.findOneOrFail(Organizations_1.Organizations, { orgId });
        const location = new Locations_1.Locations();
        location.org = org;
        location.locationCode = data.locationCode;
        location.locationName = data.locationName;
        location.locationType = data.locationType;
        location.address = data.address;
        location.city = data.city;
        location.state = data.state;
        location.country = data.country || 'NG';
        location.isPrimary = data.isPrimary ?? false;
        location.status = Locations_1.LocationsStatus.ACTIVE;
        await this.em.persistAndFlush(location);
        return {
            locationId: location.locationId,
            locationCode: location.locationCode,
            locationName: location.locationName,
            locationType: location.locationType,
            isPrimary: location.isPrimary,
            createdAt: location.createdAt,
        };
    }
};
exports.CreateLocationActivity = CreateLocationActivity;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CreateLocationActivity.prototype, "execute", null);
exports.CreateLocationActivity = CreateLocationActivity = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], CreateLocationActivity);
//# sourceMappingURL=create-location.activity.js.map