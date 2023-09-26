import { ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

/**
 * Validador para elid de un paciente, y ahorrar código en el controlador
 */
@Injectable()
export class InsuranceIdValidatorPipe implements PipeTransform {
  constructor(
    private readonly errorMessage = 'El id no es válido o no tiene el formato adecuado',
  ) {
  }

  async transform(insuranceId: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(insuranceId)) {
      throw new NotAcceptableException(this.errorMessage)
    }
    return insuranceId
  }
}
