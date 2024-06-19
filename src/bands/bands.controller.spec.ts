import { Test, TestingModule } from '@nestjs/testing';
import { BandsController } from './bands.controller';
import { BandsService } from './bands.service';

describe('BandsController', () => {
  let bandsController: BandsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BandsController],
      providers: [BandsService],
    }).compile();

    bandsController = app.get<BandsController>(BandsController);
  });
});
