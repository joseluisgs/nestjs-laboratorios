// Le modelo de la base de datos de la colección countriesLanguages
// En mongo DB

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoosePaginate from 'mongoose-paginate-v2'

// Nuestro documento de la base de datos para poder usarlo en el servicio
// y en el controlador, lo usaremos para mapear los datos de la base de datos
export type CountryLanguageDocument = CountryLanguage & Document

// Enum para el campo IsOfficial
export enum OfficialEnum {
  T = 'T',
  F = 'F',
}

// El esquema de la base de datos
@Schema({
  collection: 'countrylanguage', // Nombre de la colección en la base de datos
  timestamps: false, // No queremos que se añadan los campos createdAt y updatedAt
  // Este método toJSON se ejecutará cada vez que se llame a JSON.stringify() en un documento de Mongoose
  // mapea el _id a id y elimina __v y _id cuando se llama a JSON.stringify()
  toJSON: {
    // Aquí añadimos el método toJSON
    transform: (doc, ret) => {
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    },
  },
})

// Definimos con @Prop() cada uno de los campos de la colección
export class CountryLanguage {
  //   `CountryCode` char(3) NOT NULL DEFAULT '',
  @Prop({
    type: String,
    required: true,
    length: 3,
    default: '',
  })
  CountryCode: string
  //   `Language` char(30) NOT NULL DEFAULT '',
  @Prop({
    type: String,
    required: true,
    length: 30,
    default: '',
  })
  Language: string
  //   `IsOfficial` enum('T','F') NOT NULL DEFAULT 'F',
  @Prop({
    type: String,
    required: true,
    default: OfficialEnum.F,
  })
  IsOfficial: OfficialEnum
  //   `Percentage` decimal(4,1) NOT NULL DEFAULT '0.0',
  @Prop({
    type: Number,
    required: true,
    default: 0.0,
  })
  Percentage: number
}

// Genera el esquema de la base de datos a partir de la clase CountryLanguage
// le añado el plugin de paginación
export const CountryLanguageSchema =
  SchemaFactory.createForClass(CountryLanguage)
CountryLanguageSchema.plugin(mongoosePaginate)
