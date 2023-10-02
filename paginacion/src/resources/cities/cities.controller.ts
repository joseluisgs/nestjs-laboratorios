import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common'
import { CitiesService } from './cities.service'
import { Request } from 'express' // Es el de express, no el de NestJS

@Controller('cities')
export class CitiesController {
  private logger = new Logger(CitiesController.name)

  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number,
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
      )

      // Para ajustar los valores de page y pageSizeen hipermedia
      // Si la página es mayor que el total de páginas, se queda en la última
      let nextPage = page + 1
      if (nextPage > response.total_pages) {
        nextPage = response.total_pages
      }
      // Si la página es menor que 1, se queda en la primera página
      // Yy si es mayor que el total de páginas, se queda en la última
      let previousPage = page - 1
      if (previousPage < 1) {
        previousPage = 1
      } else if (previousPage > response.total_pages) {
        previousPage = response.total_pages
      }

      // La respuesta que se envía al cliente
      return {
        next_page: `${host}${path}?page=${nextPage}&pageSize=${pageSize}`,
        previous_page: `${host}${path}?page=${previousPage}&pageSize=${pageSize}`,
        ...response,
      }
    }

    // Si no tenemos query
    return this.citiesService.findAll()
  }
}
