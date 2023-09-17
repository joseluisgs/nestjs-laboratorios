import { Module } from '@nestjs/common'
import { SubwarehouseController } from './subwarehouse.controller'

@Module({
  controllers: [SubwarehouseController],
})
export class SubwarehouseModule {}
