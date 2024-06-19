import { Module } from '@nestjs/common';
import { BandsService } from './bands/bands.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [BandsService],
})
export class AppModule {}
