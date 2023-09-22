import { ArgumentMetadata, Injectable, NotAcceptableException, ParseUUIDPipe, PipeTransform } from '@nestjs/common'

/**
 * Validador para el id de un paciente, y ahorrar código en el controlador
 */
@Injectable()
export class PatientIdValidatorPipe implements PipeTransform {

  constructor(private readonly errorMessage = 'El id no es válido o no tiene el formato adecuado') {
  }

  async transform(patientId: string, metadata: ArgumentMetadata) {
    const uuidPipe = new ParseUUIDPipe()
    try {
      await uuidPipe.transform(patientId, metadata)
    } catch (error) {
      throw new NotAcceptableException(this.errorMessage)
    }
    return patientId
  }
}
