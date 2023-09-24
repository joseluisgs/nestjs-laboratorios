import { Test, TestingModule } from '@nestjs/testing';
import { InsurancesController } from './insurances.controller';
import { InsurancesService } from './insurances.service';

describe('InsurancesController', () => {
  let controller: InsurancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsurancesController],
      providers: [InsurancesService],
    }).compile();

    controller = module.get<InsurancesController>(InsurancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
