import { DiskHealthIndicator, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
export declare class AppController {
    private health;
    private http;
    private disk;
    private mem;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, disk: DiskHealthIndicator, mem: MemoryHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
