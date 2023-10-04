import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { CitiesModule } from './cities/cities.module'
import { CountriesModule } from './countries/countries.module'
import { CountriesLanguagesModule } from './countries-languages/countries-languages.module'

@Module({
  imports: [
    HealthCheckModule,
    CitiesModule,
    CountriesModule,
    CountriesLanguagesModule,
  ],
})
export class ResourcesModule {}
