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

/*
  Controlador de Productos
 */
@Controller('products')
export class ProductsController {
  // Obtenemos todos los productos
  @Get()
  getAllProducts(@Query('name') name: string) {
    if (name) {
      return `Get All Products with name ${name}`
    }
    return 'Get All Products'
  }

  // usando un filter por nombre
  /*@Get()
  getAllProductsByName(@Query('name') name: string) {
    return `Get All Products with name ${name}`
  }*/

  // Obtenemos un producto por su id (ParseIntPipe para parsear el id a number)
  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return `Get Product with id ${id}`
  }

  // Crear un producto
  @Post()
  createProduct(@Body() product: Product) {
    return `Create Product ${product.id} with ${product} and ${product.amount}`
  }

  // Actualizar un producto en base a su id
  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ) {
    return `Update Product with id ${id} with ${product.name} and ${product.amount}`
  }

  // Actualizar parcialmente un producto en base a su id
  @Patch(':id')
  updatePartialProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Partial<Product>,
  ) {
    return `Patch Product with id ${id} with ${product.name} and ${product.amount}`
  }

  // Eliminar un producto en base a su id
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return `Delete Product with id ${id}`
  }
}
