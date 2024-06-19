import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class BandsService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  async getBands(sortBy?: string): Promise<AxiosResponse<any, any>> {
    const bands = await this.httpService.axiosRef.get('https://bands-api.vercel.app/api/bands');

    if(sortBy === SortBy.NAME) {
      bands.data.sort((a, b) => a.name.localeCompare(b.name));

      return bands;
    } else if(sortBy == SortBy.POPULARITY) {
      bands.data.sort((a, b) => parseInt(b.numPlays) - parseInt(a.numPlays));

      return bands;
    }

    return bands;
  }

  async getBandsByName(name: string): Promise<AxiosResponse<any, any>> {
    const bands = await this.httpService.axiosRef.get('https://bands-api.vercel.app/api/bands');

    const filteredBandsByName = bands.data.filter(band => band.name.includes(name));

    return filteredBandsByName;
  }

  async getBandById(id: string): Promise<AxiosResponse<any, any>> {
    const bands = await this.httpService.axiosRef.get('https://bands-api.vercel.app/api/bands');

    const [filteredBandsById] = bands.data.filter(band => band.id == id);

    return filteredBandsById;
  }
}
