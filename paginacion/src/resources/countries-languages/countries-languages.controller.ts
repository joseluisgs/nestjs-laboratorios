import { Controller, Get } from '@nestjs/common'
import { CountriesLanguagesService } from './countries-languages.service'

@Controller('countries-languages')
export class CountriesLanguagesController {
  constructor(
    private readonly countriesLanguagesService: CountriesLanguagesService,
  ) {}

  // Aquí irán los métodos del controlador
  @Get()
  findAll() {
    return this.countriesLanguagesService.findAll()
  }
}
