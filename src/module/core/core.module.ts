import { PalmpayService } from '@/core/client/palmpay';
import { PouchiiService } from '@/core/client/pouchii';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [HttpModule],
  providers: [PalmpayService, PouchiiService],
  exports: [PalmpayService, PouchiiService],
})
export class CoreModule {}
