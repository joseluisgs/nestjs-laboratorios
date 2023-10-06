import { Test, TestingModule } from '@nestjs/testing'
import { ProcessorService } from './processor.service'

describe('ProcessorService', () => {
  let service: ProcessorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessorService],
    }).compile()

    service = module.get<ProcessorService>(ProcessorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
