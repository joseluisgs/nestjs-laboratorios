import { Module } from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CountriesController } from './countries.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from './entities/country.entity'

@Module({
  // Import the Country entity
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
