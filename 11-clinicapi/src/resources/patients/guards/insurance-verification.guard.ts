import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InsurancesService } from '../../insurances/insurances.service'
import { CreatePatientDto } from '../dto/create-patient.dto'
import { isValidObjectId } from 'mongoose'

// Deberemos inyectar el servicio de Seguros para buscar el seguro dado el id que tenga el paciente
@Injectable()
export class InsuranceVerificationGuard implements CanActivate {
  constructor(private readonly insuranceService: InsurancesService) {
  }

  async canActivate(
    context: ExecutionContext,
  ) {
    // obtenemos el contexto de la petición en HTTP
    const ctx = context.switchToHttp()
    // obtenemos la petición
    const request = ctx.getRequest()
    // Obtenemos el body de la petición
    const bodyRequest: CreatePatientDto = request.body
    // Empezamos las validaciones, si viene el id del seguro en el body de la petición
    if (bodyRequest.insuranceId) {
      if (!isValidObjectId(bodyRequest.insuranceId)) {
        throw new BadRequestException('El id del seguro no es válido')
      }
      await this.insuranceService.findOne(bodyRequest.insuranceId)
    }
    // Si todo ha ido bien, devolvemos true para que la petición siga su curso
    return true
  }
}
