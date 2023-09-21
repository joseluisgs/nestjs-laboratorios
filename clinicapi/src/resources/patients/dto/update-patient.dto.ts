import { PartialType } from '@nestjs/mapped-types'
import { CreatePatientDto } from './create-patient.dto'
import { IsOptional } from 'class-validator'

/**
 * UpdatePatientDto is a PartialType of CreatePatientDto.
 * Debemos tener en cuenta las validaciones que hemos hecho de los campos y ponerlas opcional.
 * El resto de validaciones que no hemos puesto en el DTO de creación, no es necesario ponerlas aquí.
 */
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  name: string

  @IsOptional()
  lastname: string

  @IsOptional()
  phone: string

  @IsOptional()
  email: string

  @IsOptional()
  age: number

  @IsOptional()
  address: string
}
