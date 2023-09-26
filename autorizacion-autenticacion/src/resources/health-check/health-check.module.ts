import { Module } from '@nestjs/common'
import { HealthCheckService } from './health-check.service'
import { HealthCheckController } from './health-check.controller'

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
