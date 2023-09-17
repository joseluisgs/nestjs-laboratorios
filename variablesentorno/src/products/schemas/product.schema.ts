// Definimos el schema de la colección de productos
// Impostamos las cosas de @nestjs/mongoose

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product {
  // No hace falta definir el id, pero lo dejo para que veas cómo se haría
  /* @ObjectIdColumn()
   id: ObjectId*/

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Number, default: 0, required: true })
  quantity: number
}

// Definimos el tipo de documento de la colección de productos como union type
export type ProductDocument = Product & Document

// Definimos el schema de la colección de productos para el repositorio de TypeORM
export const ProductSchema = SchemaFactory.createForClass(Product)
