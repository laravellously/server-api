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
exports.UserLocations = void 0;
const core_1 = require("@mikro-orm/core");
const Locations_1 = require("./Locations");
const Users_1 = require("./Users");
let UserLocations = class UserLocations {
    [core_1.PrimaryKeyProp];
    userLocationId;
    user;
    location;
    canAccess = true;
    createdAt;
    createdBy;
};
exports.UserLocations = UserLocations;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], UserLocations.prototype, "userLocationId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Users_1.Users, fieldName: 'user_id', deleteRule: 'cascade', index: 'idx_user_locations_user' }),
    __metadata("design:type", Users_1.Users)
], UserLocations.prototype, "user", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade', index: 'idx_user_locations_location' }),
    __metadata("design:type", Locations_1.Locations)
], UserLocations.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], UserLocations.prototype, "canAccess", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], UserLocations.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UserLocations.prototype, "createdBy", void 0);
exports.UserLocations = UserLocations = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'Maps users to accessible locations for location-scoped RLS' }),
    (0, core_1.Unique)({ name: 'user_locations_user_id_location_id_key', properties: ['user', 'location'] })
], UserLocations);
//# sourceMappingURL=UserLocations.js.map