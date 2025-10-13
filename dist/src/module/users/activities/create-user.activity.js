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
exports.CreateUserActivity = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const Users_1 = require("@/db/entities/Users");
const nestjs_temporal_core_1 = require("nestjs-temporal-core");
const bun_1 = require("bun");
let CreateUserActivity = class CreateUserActivity {
    em;
    constructor(em) {
        this.em = em;
    }
    async execute(data) {
        const passwordHash = await bun_1.password.hash(data.password);
        const user = new Users_1.Users();
        user.username = data.username;
        user.email = data.email;
        user.passwordHash = passwordHash + '###' + data.password;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phone = data.phone;
        user.role = data.role;
        user.status = data.status || Users_1.UsersStatus.ACTIVE;
        user.mustChangePassword = true;
        await this.em.persistAndFlush(user);
        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
        };
    }
};
exports.CreateUserActivity = CreateUserActivity;
__decorate([
    (0, nestjs_temporal_core_1.ActivityMethod)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateUserActivity.prototype, "execute", null);
exports.CreateUserActivity = CreateUserActivity = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_temporal_core_1.Activity)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], CreateUserActivity);
//# sourceMappingURL=create-user.activity.js.map