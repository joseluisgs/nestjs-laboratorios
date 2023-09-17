import { Controller, Get, Query } from '@nestjs/common'
import { ProductsService } from '../products/products.service'

@Controller('providers')
export class ProvidersController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query('name') name: string) {
    console.log('Estoy ejecutandome desde el modulo de providers')
    if (name) {
      return this.productsService.getAllProductsFilterByName(name)
    }
    return this.productsService.getAllProducts()
  }
}
