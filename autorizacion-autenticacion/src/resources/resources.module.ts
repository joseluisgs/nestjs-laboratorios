import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthCheckModule, AuthModule],
})
export class ResourcesModule {}
