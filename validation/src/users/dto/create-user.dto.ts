// DTO intentamos que sean solo de lectura
import { IsAlpha, IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsAlpha('es-ES', { message: 'El nombre solo puede contener letras' })
  //@IsNotEmpty()
  readonly name: string

  @IsAlpha()
  //@IsNotEmpty()
  readonly surname: string

  @IsInt()
  @Min(18)
  @Max(90)
  readonly age: number

  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly address: string

  @IsBoolean()
  readonly single: boolean

  @IsEnum(UserType)
  readonly userType: string
}
