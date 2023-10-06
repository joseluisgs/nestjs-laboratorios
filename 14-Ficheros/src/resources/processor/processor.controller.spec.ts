import { Test, TestingModule } from '@nestjs/testing'
import { ProcessorController } from './processor.controller'
import { ProcessorService } from './services/processor/processor.service'

describe('ProcessorController', () => {
  let controller: ProcessorController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessorController],
      providers: [ProcessorService],
    }).compile()

    controller = module.get<ProcessorController>(ProcessorController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
