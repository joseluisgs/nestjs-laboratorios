import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

/**
 * Create patient DTO
 * Usamos validadores de clase para validar los datos de entrada
 */
export class CreatePatientDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsAlpha('es-ES', {
    message: 'El nombre solo puede contener letras, el valor actual es: $value',
  })
  name: string

  @IsNotEmpty({ message: 'El apellidos es requerido' })
  @IsAlpha('es-ES', {
    message:
      'El apellido solo puede contener letras, el valor actual es: $value',
  })
  lastname: string

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  phone: string

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido, el valor actual es: $value' })
  email: string

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(0, { message: 'La edad debe ser mayor o igual a $constraint1' })
  @Max(150, { message: 'La edad debe ser menor o igual a $constraint1' })
  age: number

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  address: string
}
