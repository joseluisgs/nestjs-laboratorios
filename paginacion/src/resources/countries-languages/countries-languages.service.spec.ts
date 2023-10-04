import { Test, TestingModule } from '@nestjs/testing';
import { CountriesLanguagesService } from './countries-languages.service';

describe('CountriesLanguagesService', () => {
  let service: CountriesLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesLanguagesService],
    }).compile();

    service = module.get<CountriesLanguagesService>(CountriesLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
