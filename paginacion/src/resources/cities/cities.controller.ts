import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
  private logger = new Logger(CitiesController.name)

  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number,
  ) {
    this.logger.log(`findAll: page: ${page}, pageSize: ${pageSize}`)
    if (page) {
      return this.citiesService.findAllWithPagination(page, pageSize)
    }
    return this.citiesService.findAll()
  }
}
