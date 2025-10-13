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
exports.LocationsStatus = exports.LocationsLocationType = exports.Locations = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let Locations = class Locations {
    [core_1.PrimaryKeyProp];
    locationId;
    org;
    locationCode;
    locationName;
    locationType;
    address;
    city;
    state;
    country = 'NG';
    latitude;
    longitude;
    phone;
    email;
    managerUserId;
    isPrimary = false;
    status = LocationsStatus.ACTIVE;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.Locations = Locations;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Locations.prototype, "locationId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_locations_org_id', expression: 'CREATE INDEX idx_locations_org_id ON core.locations USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Locations.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 20 }),
    __metadata("design:type", String)
], Locations.prototype, "locationCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Locations.prototype, "locationName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LocationsLocationType }),
    __metadata("design:type", String)
], Locations.prototype, "locationType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "city", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "state", void 0);
__decorate([
    (0, core_1.Property)({ type: 'character', length: 2 }),
    __metadata("design:type", Object)
], Locations.prototype, "country", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "latitude", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "longitude", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "email", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_locations_manager', expression: 'CREATE INDEX idx_locations_manager ON core.locations USING btree (manager_user_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "managerUserId", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean', comment: 'Indicates primary/head office location' }),
    __metadata("design:type", Object)
], Locations.prototype, "isPrimary", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LocationsStatus }),
    __metadata("design:type", Object)
], Locations.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Locations.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Locations.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Locations.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Locations.prototype, "updatedBy", void 0);
exports.Locations = Locations = __decorate([
    (0, core_1.Entity)({ schema: 'core', comment: 'Physical locations (stores, warehouses, branches) belonging to organizations' }),
    (0, core_1.Index)({ name: 'idx_locations_status', expression: 'CREATE INDEX idx_locations_status ON core.locations USING btree (org_id, status) WHERE (deleted_at IS NULL)', properties: ['org', 'status'] }),
    (0, core_1.Index)({ name: 'idx_locations_type', expression: 'CREATE INDEX idx_locations_type ON core.locations USING btree (org_id, location_type) WHERE (deleted_at IS NULL)', properties: ['org', 'locationType'] }),
    (0, core_1.Unique)({ name: 'locations_org_id_location_code_key', properties: ['org', 'locationCode'] })
], Locations);
var LocationsLocationType;
(function (LocationsLocationType) {
    LocationsLocationType["STORE"] = "store";
    LocationsLocationType["WAREHOUSE"] = "warehouse";
    LocationsLocationType["OFFICE"] = "office";
    LocationsLocationType["FACTORY"] = "factory";
    LocationsLocationType["SERVICE_CENTER"] = "service_center";
})(LocationsLocationType || (exports.LocationsLocationType = LocationsLocationType = {}));
var LocationsStatus;
(function (LocationsStatus) {
    LocationsStatus["ACTIVE"] = "active";
    LocationsStatus["INACTIVE"] = "inactive";
    LocationsStatus["CLOSED"] = "closed";
})(LocationsStatus || (exports.LocationsStatus = LocationsStatus = {}));
//# sourceMappingURL=Locations.js.map