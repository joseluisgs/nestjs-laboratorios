import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [HealthCheckModule, CitiesModule],
})
export class ResourcesModule {}
