import { Module } from '@nestjs/common'
import { ProcessorService } from './services/processor/processor.service'
import { ProcessorController } from './processor.controller'
import { SharpService } from './services/sharp/sharp.service'

@Module({
  controllers: [ProcessorController],
  providers: [ProcessorService, SharpService],
})
export class ProcessorModule {}
