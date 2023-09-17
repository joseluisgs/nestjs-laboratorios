import { Module } from '@nestjs/common'
import { SubwarehouseModule } from './subwarehouse/subwarehouse.module'
import { WarehousesController } from './warehouses.controller'

@Module({
  imports: [SubwarehouseModule], // Importamos el módulo de Subwarehouses
  controllers: [WarehousesController],
  providers: [],
})
export class WarehousesModule {}
