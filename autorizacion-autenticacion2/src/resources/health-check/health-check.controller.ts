import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from './health-check.service'

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  getHealthCheck() {
    return this.healthCheckService.getHealthCheck()
  }
}
