import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from './schemas/product.schema'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  // Inyectamos el documento de productos de Mongoose
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product'
  }

  async findAll() {
    return this.productModel.find().find()
  }

  findOne(id: string) {
    return this.productModel.findById(id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: string) {
    const myId = new mongoose.Types.ObjectId(id)
    return this.productModel.findByIdAndDelete(myId)
  }
}
