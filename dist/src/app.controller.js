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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
let AppController = class AppController {
    health;
    http;
    disk;
    mem;
    constructor(health, http, disk, mem) {
        this.health = health;
        this.http = http;
        this.disk = disk;
        this.mem = mem;
    }
    check() {
        return this.health.check([
            () => this.http.pingCheck('api', 'https://api.pouchii.net'),
            () => this.mem.checkHeap('memory', 512 * 1024 * 1024),
            () => this.mem.checkRSS('memory::rss', 150 * 1024 * 1024),
            () => this.disk.checkStorage('disk::uploads', { path: 'C:\\', threshold: 250 * 1024 * 1024 * 1024 }),
        ]);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "check", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.HttpHealthIndicator,
        terminus_1.DiskHealthIndicator,
        terminus_1.MemoryHealthIndicator])
], AppController);
//# sourceMappingURL=app.controller.js.map