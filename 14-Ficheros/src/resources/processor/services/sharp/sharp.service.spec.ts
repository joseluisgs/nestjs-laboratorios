import { Test, TestingModule } from '@nestjs/testing'
import { SharpService } from './sharp.service'

describe('SharpService', () => {
  let service: SharpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharpService],
    }).compile()

    service = module.get<SharpService>(SharpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
