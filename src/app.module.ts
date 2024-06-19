import { Module } from '@nestjs/common';
import { BandsController } from './bands/bands.controller';
import { BandsService } from './bands/bands.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [BandsController],
  providers: [BandsService],
})
export class AppModule {}
