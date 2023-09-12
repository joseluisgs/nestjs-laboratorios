import { Module } from '@nestjs/common'
import { ProvidersController } from './providers.controller'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [ProductsModule], // Importamos el módulo de productos
  controllers: [ProvidersController],
})
export class ProvidersModule {}
