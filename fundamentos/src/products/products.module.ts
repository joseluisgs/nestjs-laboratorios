import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Exportamos el servicio para poder usarlo en otros módulos, importante, si no no es visible
})
export class ProductsModule {}
