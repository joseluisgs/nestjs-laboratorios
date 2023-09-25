import { IsAlpha, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * Create patient DTO
 * Usamos validadores de clase para validar los datos de entrada
 */
export class CreatePatientDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsAlpha('es-ES', {
    message: 'El nombre solo puede contener letras, el valor actual es: $value',
  })
  @ApiProperty({
    required: true,
    description: 'Nombre del paciente',
    example: 'jhon',
  })
  name: string

  @IsNotEmpty({ message: 'El apellidos es requerido' })
  @IsAlpha('es-ES', {
    message:
      'El apellido solo puede contener letras, el valor actual es: $value',
  })
  @ApiProperty({
    required: true,
    description: 'Apellidos del paciente',
    example: 'doe',
  })
  lastname: string

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  @ApiProperty({
    required: true,
    description: 'Teléfono del paciente',
    example: '123456789',
  })
  phone: string

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido, el valor actual es: $value' })
  @ApiProperty({
    required: true,
    description: 'Email del paciente',
    example: 'john@example.com',
  })
  email: string

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(0, { message: 'La edad debe ser mayor o igual a $constraint1' })
  @Max(150, { message: 'La edad debe ser menor o igual a $constraint1' })
  @ApiProperty({
    required: true,
    description: 'Edad del paciente, mayor o igual a 0 y menor o igual a 150',
  })
  age: number

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @ApiProperty({
    required: false,
    description: 'Dirección del paciente',
    example: 'Calle 123',
  })
  address: string

  @IsOptional()
  @IsString({ message: 'El id del seguro debe ser un texto' })
  @ApiProperty({
    required: false,
    description: 'Id del seguro del paciente',
    example: '60f0a9b9e6b3a3b3e0a3e0a3',
  })
  insuranceId: string
}
