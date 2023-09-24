import { ArgumentMetadata, Injectable, NotAcceptableException, ParseUUIDPipe, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'

/**
 * Validador para el id de un paciente, y ahorrar código en el controlador
 */
@Injectable()
export class InsuranceIdValidatorPipe implements PipeTransform {
  constructor(
    private readonly errorMessage = 'El id no es válido o no tiene el formato adecuado',
  ) {
  }

  async transform(insuranceId: string, metadata: ArgumentMetadata) {
    const uuidPipe = new ParseUUIDPipe()

    const validObjectId = Types.ObjectId.isValid(insuranceId)
    if (!validObjectId) {
      throw new NotAcceptableException(this.errorMessage)
    }
    return Types.ObjectId.createFromHexString(insuranceId)

  }
}
