import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common'
import { CitiesService, Filter, Sort } from './cities.service'
import { Request } from 'express'
import { TypePipe } from './pipes/filter-type-pype/type.pipe' // Es el de express, no el de NestJS

@Controller('cities')
export class CitiesController {
  private logger = new Logger(CitiesController.name)

  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number,
    @Query(
      'filter',
      new TypePipe(['ID', 'Name', 'countryCode', 'District', 'Population']),
    )
    filter: Filter = 'ID',
    @Query('order', new TypePipe(['ASC', 'DESC'])) order: Sort = 'ASC',
    @Query('search') search = '',
    @Req() request: Request,
  ) {
    // console.log(request)
    const { path } = request.route
    const { host } = request.headers
    this.logger.log(`Request to ${host}${path}`)
    this.logger.log(`findAll: page: ${page}, pageSize: ${pageSize}`)
    if (page) {
      const response = await this.citiesService.findAllWithPagination(
        page,
        pageSize,
        filter,
        order,
        search,
      )

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
    }

    // Si no tenemos query
    return this.citiesService.findAll()
  }
}
