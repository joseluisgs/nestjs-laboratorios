import { Document } from 'mongoose'

/**
 * Clase que representa el modelo de datos de los seguros
 * Trabajamos con los tipos de datos de TypeScript/Mongoose
 * Nos sirve para definir la estructura de los datos
 */
export class Insurance extends Document {
  readonly name: String
  readonly address: String
  readonly phone: String
  readonly email: String
  readonly postal_code: String
}

