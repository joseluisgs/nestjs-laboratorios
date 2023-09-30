import { Controller, Get, UseGuards } from '@nestjs/common'
import { HealthCheckService } from './health-check.service'
import { BasicAuthGuard } from '../../auth/guards/basic-auth/basic-auth.guard'

// Si no nos hacemos un basi guard
// @UseGuards(AuthGuard('basic'))
// Si lo hacemos
@UseGuards(BasicAuthGuard)
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  getHealthCheck() {
    return this.healthCheckService.getHealthCheck()
  }
}
