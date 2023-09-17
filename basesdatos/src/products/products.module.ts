import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from './schemas/product.schema'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  // importamos el módulo de TypeORM Mongoose y le pasamos el schema a usar
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
