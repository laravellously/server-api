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
exports.AccountTypesNormalBalance = exports.AccountTypesCategory = exports.AccountTypes = void 0;
const core_1 = require("@mikro-orm/core");
let AccountTypes = class AccountTypes {
    [core_1.PrimaryKeyProp];
    accountTypeId;
    typeCode;
    typeName;
    category;
    normalBalance;
    isSystem = false;
    createdAt;
};
exports.AccountTypes = AccountTypes;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: `uuid_generate_v4()` }),
    __metadata("design:type", Object)
], AccountTypes.prototype, "accountTypeId", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, unique: 'account_types_type_code_key' }),
    __metadata("design:type", String)
], AccountTypes.prototype, "typeCode", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], AccountTypes.prototype, "typeName", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AccountTypesCategory }),
    __metadata("design:type", String)
], AccountTypes.prototype, "category", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AccountTypesNormalBalance }),
    __metadata("design:type", String)
], AccountTypes.prototype, "normalBalance", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Object)
], AccountTypes.prototype, "isSystem", void 0);
__decorate([
    (0, core_1.Property)({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` }),
    __metadata("design:type", Object)
], AccountTypes.prototype, "createdAt", void 0);
exports.AccountTypes = AccountTypes = __decorate([
    (0, core_1.Entity)({ schema: 'accounting', comment: 'Standard account types for chart of accounts classification' })
], AccountTypes);
var AccountTypesCategory;
(function (AccountTypesCategory) {
    AccountTypesCategory["ASSET"] = "ASSET";
    AccountTypesCategory["LIABILITY"] = "LIABILITY";
    AccountTypesCategory["EQUITY"] = "EQUITY";
    AccountTypesCategory["REVENUE"] = "REVENUE";
    AccountTypesCategory["EXPENSE"] = "EXPENSE";
})(AccountTypesCategory || (exports.AccountTypesCategory = AccountTypesCategory = {}));
var AccountTypesNormalBalance;
(function (AccountTypesNormalBalance) {
    AccountTypesNormalBalance["DEBIT"] = "DEBIT";
    AccountTypesNormalBalance["CREDIT"] = "CREDIT";
})(AccountTypesNormalBalance || (exports.AccountTypesNormalBalance = AccountTypesNormalBalance = {}));
//# sourceMappingURL=AccountTypes.js.map