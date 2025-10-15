import { Controller, Get } from '@nestjs/common';
import {
  // DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    // private disk: DiskHealthIndicator,
    private mem: MemoryHealthIndicator,
  ) {}

  @Get()
  @AllowAnonymous()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('api', 'https://api.pouchii.net'),
      () => this.mem.checkHeap('memory', 512 * 1024 * 1024),
      // () => this.mem.checkRSS('memory::rss', 150 * 1024 * 1024),
      // () => this.disk.checkStorage('disk::uploads', { path: 'C:\\', threshold: 250 * 1024 * 1024 * 1024 }),
      // () => this.disk.checkStorage('storage', {  path: '/', threshold: 250 * 1024 * 1024 * 1024, })
    ]);
  }
}
