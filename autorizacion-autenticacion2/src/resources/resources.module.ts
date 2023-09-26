import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'

@Module({
  imports: [HealthCheckModule],
})
export class ResourcesModule {}
