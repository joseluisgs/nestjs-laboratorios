import { Test, TestingModule } from '@nestjs/testing';
import { InsurancesService } from './insurances.service';

describe('InsurancesService', () => {
  let service: InsurancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsurancesService],
    }).compile();

    service = module.get<InsurancesService>(InsurancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
