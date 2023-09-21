import { PartialType } from '@nestjs/mapped-types'
import { CreatePatientDto } from './create-patient.dto'

/**
 * UpdatePatientDto is a PartialType of CreatePatientDto.
 */
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
}
