import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard'
import { RoleAuthGuard } from '../../auth/guards/role-auth/role-auth.guard'

// Solo autenticados a nivel de controlador
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Solo autenticados a nivel de método
  @UseGuards(new RoleAuthGuard('ADMIN', 'WAREHOUSE_ADMIN'))
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @UseGuards(new RoleAuthGuard('ADMIN', 'WAREHOUSE_ADMIN', 'SELLER', 'USER'))
  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @UseGuards(new RoleAuthGuard('ADMIN', 'WAREHOUSE_ADMIN', 'SELLER', 'USER'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @UseGuards(new RoleAuthGuard('ADMIN', 'WAREHOUSE_ADMIN', 'SELLER'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
