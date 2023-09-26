import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Dto for creating a new insurance
 */
export class CreateInsuranceDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe es inválido' })
  @ApiProperty({ required: true, description: 'Nombre de la aseguradora', example: 'Seguros Felicidad' })
  readonly name: string

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección es inválida' })
  @ApiProperty({ required: true, description: 'Dirección de la aseguradora', example: 'Calle 123' })
  readonly address: string

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString({ message: 'El teléfono es inválido' })
  @ApiProperty({ required: true, description: 'Teléfono de la aseguradora', example: '+34-123456789' })
  readonly phone: string

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email es inválido' })
  @ApiProperty({ required: true, description: 'Email de la aseguradora', example: 'email@email.com' })
  readonly email: string

  @IsNotEmpty({ message: 'El código postal es obligatorio' })
  @IsString({ message: 'El código postal es inválido' })
  @MaxLength(6, { message: 'El código postal no puede tener más de 6 caracteres' })
  @MinLength(4, { message: 'El código postal no puede tener menos de 4 caracteres' })
  @ApiProperty({ required: true, description: 'Código postal de la aseguradora', example: '12345' })
  readonly postal_code: string
}
