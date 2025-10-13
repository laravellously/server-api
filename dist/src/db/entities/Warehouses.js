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
exports.WarehousesWarehouseType = exports.Warehouses = void 0;
const core_1 = require("@mikro-orm/core");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let Warehouses = class Warehouses {
    [core_1.PrimaryKeyProp];
    warehouseId;
    org;
    location;
    warehouseCode;
    warehouseName;
    warehouseType;
    isActive = true;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Warehouses = Warehouses;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Warehouses.prototype, "warehouseId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Warehouses.prototype, "org", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', deleteRule: 'cascade' }),
    __metadata("design:type", Locations_1.Locations)
], Warehouses.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Warehouses.prototype, "warehouseCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Warehouses.prototype, "warehouseName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => WarehousesWarehouseType, nullable: true }),
    __metadata("design:type", String)
], Warehouses.prototype, "warehouseType", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Warehouses.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Warehouses.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Warehouses.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Warehouses.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Warehouses.prototype, "createdBy", void 0);
exports.Warehouses = Warehouses = __decorate([
    (0, core_1.Entity)({ schema: 'inventory', comment: 'Warehouses/storage areas within physical locations' }),
    (0, core_1.Index)({ name: 'idx_warehouses_org_location', expression: 'CREATE INDEX idx_warehouses_org_location ON inventory.warehouses USING btree (org_id, location_id) WHERE (deleted_at IS NULL)', properties: ['org', 'location'] }),
    (0, core_1.Unique)({ name: 'warehouses_org_id_location_id_warehouse_code_key', properties: ['org', 'location', 'warehouseCode'] })
], Warehouses);
var WarehousesWarehouseType;
(function (WarehousesWarehouseType) {
    WarehousesWarehouseType["MAIN"] = "main";
    WarehousesWarehouseType["TRANSIT"] = "transit";
    WarehousesWarehouseType["RETAIL"] = "retail";
    WarehousesWarehouseType["DAMAGED"] = "damaged";
    WarehousesWarehouseType["QUARANTINE"] = "quarantine";
})(WarehousesWarehouseType || (exports.WarehousesWarehouseType = WarehousesWarehouseType = {}));
//# sourceMappingURL=Warehouses.js.map