import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesController } from './warehouses.controller';

describe('WarehousesController', () => {
  let controller: WarehousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehousesController],
    }).compile();

    controller = module.get<WarehousesController>(WarehousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
