import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Clase que representa el modelo de datos de los seguros
 * Trabajamos con los tipos de datos de TypeScript/Mongoose
 * Nos sirve para definir la estructura de los datos
 */
export class Insurance extends Document {
  @ApiProperty({ required: true, description: 'Nombre de la aseguradora', example: 'Seguros Felicidad' })
  readonly name: string

  @ApiProperty({ required: true, description: 'Dirección de la aseguradora', example: 'Calle 123' })
  readonly address: string

  @ApiProperty({ required: true, description: 'Teléfono de la aseguradora', example: '+34-123456789' })
  readonly phone: string

  @ApiProperty({ required: true, description: 'Email de la aseguradora', example: 'email@email.com' })
  readonly email: string

  @ApiProperty({ required: true, description: 'Código postal de la aseguradora', example: '12345' })
  readonly postal_code: string
}

