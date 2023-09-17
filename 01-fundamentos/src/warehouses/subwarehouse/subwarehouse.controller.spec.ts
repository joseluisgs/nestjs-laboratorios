import { Test, TestingModule } from '@nestjs/testing';
import { SubwarehouseController } from './subwarehouse.controller';

describe('SubwarehouseController', () => {
  let controller: SubwarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubwarehouseController],
    }).compile();

    controller = module.get<SubwarehouseController>(SubwarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
