import { Injectable } from '@nestjs/common'
import { Product } from './products.model'

@Injectable()
export class ProductsService {
  getAllProducts() {
    return 'Get All Products'
  }

  getAllProductsFilterByName(name: string) {
    return `Get All Products with name ${name}`
  }

  // Obtenemos un producto por su id (ParseIntPipe para parsear el id a number)
  getProductById(id: number) {
    return `Get Product with id ${id}`
  }

  // Crear un producto
  createProduct(product: Product) {
    return `Create Product ${product.id} with ${product.name} and ${product.amount}`
  }

  // Actualizar un producto en base a su id
  updateProduct(id: number, product: Product) {
    return `Update Product with id ${id} with ${product.name} and ${product.amount}`
  }

  // Actualizar parcialmente un producto en base a su id
  updatePartialProduct(id: number, product: Partial<Product>) {
    return `Patch Product with id ${id} with ${product.name} and ${product.amount}`
  }

  // Eliminar un producto en base a su id
  deleteProduct(id: number) {
    return `Delete Product with id ${id}`
  }
}
