import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from './health-check.service'
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from '@nestjs/swagger'

/**
 * Controlador que se encarga de verificar el estado de la API.
 */
@ApiTags('HealthCheck')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'La api está funcionando correctamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api',
  })
  getApiHealthStatus() {
    return this.healthCheckService.checkApiHeathStatus()
  }
}
