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
exports.ChannelsChannelType = exports.Channels = void 0;
const core_1 = require("@mikro-orm/core");
const Locations_1 = require("./Locations");
const Organizations_1 = require("./Organizations");
let Channels = class Channels {
    [core_1.PrimaryKeyProp];
    channelId;
    org;
    channelCode;
    channelName;
    channelType;
    location;
    isActive = true;
    config;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
};
exports.Channels = Channels;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], Channels.prototype, "channelId", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_channels_org', expression: 'CREATE INDEX idx_channels_org ON sales.channels USING btree (org_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade' }),
    __metadata("design:type", Organizations_1.Organizations)
], Channels.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], Channels.prototype, "channelCode", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Channels.prototype, "channelName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ChannelsChannelType }),
    __metadata("design:type", String)
], Channels.prototype, "channelType", void 0);
__decorate([
    (0, core_1.Index)({ name: 'idx_channels_location', expression: 'CREATE INDEX idx_channels_location ON sales.channels USING btree (location_id) WHERE (deleted_at IS NULL)' }),
    (0, core_1.ManyToOne)({ entity: () => Locations_1.Locations, fieldName: 'location_id', nullable: true }),
    __metadata("design:type", Locations_1.Locations)
], Channels.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], Channels.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Channels.prototype, "config", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Channels.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], Channels.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Channels.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Channels.prototype, "createdBy", void 0);
exports.Channels = Channels = __decorate([
    (0, core_1.Entity)({ schema: 'sales', comment: 'Sales channels (POS, online, marketplace) with channel-specific configurations' }),
    (0, core_1.Unique)({ name: 'channels_org_id_channel_code_key', properties: ['org', 'channelCode'] })
], Channels);
var ChannelsChannelType;
(function (ChannelsChannelType) {
    ChannelsChannelType["POS"] = "POS";
    ChannelsChannelType["ONLINE"] = "ONLINE";
    ChannelsChannelType["MARKETPLACE"] = "MARKETPLACE";
    ChannelsChannelType["MOBILE"] = "MOBILE";
    ChannelsChannelType["PHONE"] = "PHONE";
    ChannelsChannelType["WHOLESALE"] = "WHOLESALE";
})(ChannelsChannelType || (exports.ChannelsChannelType = ChannelsChannelType = {}));
//# sourceMappingURL=Channels.js.map