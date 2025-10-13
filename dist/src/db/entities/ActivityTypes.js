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
exports.ActivityTypesCategory = exports.ActivityTypes = void 0;
const core_1 = require("@mikro-orm/core");
const Organizations_1 = require("./Organizations");
let ActivityTypes = class ActivityTypes {
    [core_1.PrimaryKeyProp];
    activityTypeId;
    org;
    typeCode;
    typeName;
    category;
    isActive = true;
    createdAt;
};
exports.ActivityTypes = ActivityTypes;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], ActivityTypes.prototype, "activityTypeId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Organizations_1.Organizations, fieldName: 'org_id', deleteRule: 'cascade', index: 'idx_activity_types_org' }),
    __metadata("design:type", Organizations_1.Organizations)
], ActivityTypes.prototype, "org", void 0);
__decorate([
    (0, core_1.Property)({ length: 50 }),
    __metadata("design:type", String)
], ActivityTypes.prototype, "typeCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], ActivityTypes.prototype, "typeName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ActivityTypesCategory }),
    __metadata("design:type", String)
], ActivityTypes.prototype, "category", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], ActivityTypes.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], ActivityTypes.prototype, "createdAt", void 0);
exports.ActivityTypes = ActivityTypes = __decorate([
    (0, core_1.Entity)({ schema: 'crm', comment: 'Activity types for customer interactions (calls, emails, meetings, WhatsApp)' }),
    (0, core_1.Unique)({ name: 'activity_types_org_id_type_code_key', properties: ['org', 'typeCode'] })
], ActivityTypes);
var ActivityTypesCategory;
(function (ActivityTypesCategory) {
    ActivityTypesCategory["CALL"] = "CALL";
    ActivityTypesCategory["EMAIL"] = "EMAIL";
    ActivityTypesCategory["MEETING"] = "MEETING";
    ActivityTypesCategory["TASK"] = "TASK";
    ActivityTypesCategory["NOTE"] = "NOTE";
    ActivityTypesCategory["SMS"] = "SMS";
    ActivityTypesCategory["WHATSAPP"] = "WHATSAPP";
})(ActivityTypesCategory || (exports.ActivityTypesCategory = ActivityTypesCategory = {}));
//# sourceMappingURL=ActivityTypes.js.map