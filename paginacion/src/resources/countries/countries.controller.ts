import { Controller, Get } from '@nestjs/common'
import { CountriesService } from './countries.service'
import { Paginate, PaginateQuery } from 'nestjs-paginate'

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findPaginated(@Paginate() query: PaginateQuery) {
    return await this.countriesService.findPaginated(query)
  }
}
