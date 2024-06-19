import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { BandsService } from './bands.service';
import { AxiosResponse } from 'axios';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('bands')
@UseInterceptors(CacheInterceptor)
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  async getBands(): Promise<AxiosResponse<any, any>> {
    return (await this.bandsService.getBands()).data;
  }

  @Get()
  async getBandsByName(@Query('name') bandName: string) {
    const { name, numPlays } = (await this.bandsService.getBandsByName(bandName)).data;

    return {
      name,
      numPlays
    }
  }

  @Get()
  async getBandById(@Param('id') id: string): Promise<AxiosResponse<any, any>> {
    return (await this.bandsService.getBandById(id)).data;
  }
}
