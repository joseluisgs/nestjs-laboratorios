import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  Query,
} from '@nestjs/common'
import {
  CountriesLanguagesService,
  CountryLanguageFilter,
  CountryLanguageOrder,
} from './countries-languages.service'

@Controller('countries-languages')
export class CountriesLanguagesController {
  private logger = new Logger(CountriesLanguagesController.name)

  constructor(
    private readonly countriesLanguagesService: CountriesLanguagesService,
  ) {}

  // Aquí irán los métodos del controlador
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(0))
    page: number = 1,
    @Query('pageSize', new DefaultValuePipe(0))
    pageSize: number = 20,
    @Query('filter', new DefaultValuePipe('CountryCode'))
    filter: CountryLanguageFilter = 'CountryCode',
    @Query('order', new DefaultValuePipe('asc'))
    order: CountryLanguageOrder = 'asc',
    @Query('search', new DefaultValuePipe('')) search: string = '',
  ) {
    // this.logger.log(`page: ${page}, pageSize: ${pageSize}`)
    if (pageSize)
      return this.countriesLanguagesService.findAllPaginated(
        page,
        pageSize,
        filter,
        order,
        search,
      )
    else return this.countriesLanguagesService.findAll()
  }
}
