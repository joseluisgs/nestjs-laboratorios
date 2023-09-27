import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [HealthCheckModule, UsersModule],
})
export class ResourcesModule {}
