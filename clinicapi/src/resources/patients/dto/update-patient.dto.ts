import { PartialType } from '@nestjs/mapped-types'
import { CreatePatientDto } from './create-patient.dto'
import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * UpdatePatientDto is a PartialType of CreatePatientDto.
 * Debemos tener en cuenta las validaciones que hemos hecho de los campos y ponerlas opcional.
 * El resto de validaciones que no hemos puesto en el DTO de creación, no es necesario ponerlas aquí.
 */
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Nombre del paciente',
    example: 'jhon',
  })
  name: string

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Apellidos del paciente',
    example: 'doe',
  })
  lastname: string

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Teléfono del paciente',
    example: '123456789',
  })
  phone: string

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Email del paciente',
    example: 'john@example.com',
  })
  email: string

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Edad del paciente, mayor o igual a 0 y menor o igual a 150',
  })
  age: number

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Dirección del paciente',
    example: 'Calle 123',
  })
  address: string
}

