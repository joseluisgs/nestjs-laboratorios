import { Test, TestingModule } from '@nestjs/testing';
import { CountriesLanguagesController } from './countries-languages.controller';
import { CountriesLanguagesService } from './countries-languages.service';

describe('CountriesLanguagesController', () => {
  let controller: CountriesLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesLanguagesController],
      providers: [CountriesLanguagesService],
    }).compile();

    controller = module.get<CountriesLanguagesController>(CountriesLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
