import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { Product } from './products.model'
import { ProductsService } from './products.service'

/*
  Controlador de Productos
 */
@Controller('products')
export class ProductsController {
  // Constructor de la clase
  constructor(private readonly productService: ProductsService) {}

  // Obtenemos todos los productos
  @Get()
  getAllProducts(@Query('name') name: string) {
    if (name) {
      return this.productService.getAllProductsFilterByName(name)
    }
    return this.productService.getAllProducts()
  }

  // usando un filter por nombre
  /*@Get()
  getAllProductsByName(@Query('name') name: string) {
    return `Get All Products with name ${name}`
  }*/

  // Obtenemos un producto por su id (ParseIntPipe para parsear el id a number)
  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id)
  }

  // Crear un producto
  @Post()
  createProduct(@Body() product: Product) {
    return this.productService.createProduct(product)
  }

  // Actualizar un producto en base a su id
  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ) {
    return this.productService.updateProduct(id, product)
  }

  // Actualizar parcialmente un producto en base a su id
  @Patch(':id')
  updatePartialProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Partial<Product>,
  ) {
    return this.productService.updatePartialProduct(id, product)
  }

  // Eliminar un producto con base a su id
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id)
  }
}
