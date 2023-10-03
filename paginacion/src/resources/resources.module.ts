import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { CitiesModule } from './cities/cities.module'
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [HealthCheckModule, CitiesModule, CountriesModule],
})
export class ResourcesModule {}
