import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  Query,
  Req,
} from '@nestjs/common'
import {
  CountriesLanguagesService,
  CountryLanguageFilter,
  CountryLanguageOrder,
} from './countries-languages.service'
import { Request } from 'express'

@Controller('countries-languages')
export class CountriesLanguagesController {
  private logger = new Logger(CountriesLanguagesController.name)

  constructor(
    private readonly countriesLanguagesService: CountriesLanguagesService,
  ) {}

  // Aquí irán los métodos del controlador
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(0))
    page: number = 1,
    @Query('pageSize', new DefaultValuePipe(0))
    pageSize: number = 20,
    @Query('filter', new DefaultValuePipe('CountryCode'))
    filter: CountryLanguageFilter = 'CountryCode',
    @Query('order', new DefaultValuePipe('asc'))
    order: CountryLanguageOrder = 'asc',
    @Query('search', new DefaultValuePipe('')) search: string = '',
    @Req() request: Request,
  ) {
    // this.logger.log(`page: ${page}, pageSize: ${pageSize}`)
    if (pageSize) {
      const response = await this.countriesLanguagesService.findAllPaginated(
        page,
        pageSize,
        filter,
        order,
        search,
      )
      const { path } = request.route
      const { host } = request.headers

      // Construimos las URLs de las páginas siguiente y anterior
      /*
      En este código, Math.min(page + 1, Number(response.total_pages)) devolverá el menor de los dos valores,
      lo que garantiza que nextPage no sea mayor que response.total_pages. De manera similar,
      Math.max(1, Math.min(page - 1, Number(response.total_pages))) garantizará que previousPage
      no sea menor que 1 ni mayor que response.total_pages.

       */

      const nextPage = Math.min(page + 1, Number(response.total_pages))
      const previousPage = Math.max(
        1,
        Math.min(page - 1, Number(response.total_pages)),
      )

      return {
        ...response,
        next_page: `${host}${path}?page=${nextPage}&pageSize=${pageSize}&filter=${filter}&order=${order}&search=${search}`,
        prev_page: `${host}${path}?page=${previousPage}&pageSize=${pageSize}&filter=${filter}&order=${order}&search=${search}`,
      }
    } else {
      return this.countriesLanguagesService.findAll()
    }
  }
}
