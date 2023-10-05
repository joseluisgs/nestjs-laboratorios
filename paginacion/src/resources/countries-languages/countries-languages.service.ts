import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel } from 'mongoose' // has necesitado importar el esquema en el createFactory del esquema
import {
  CountryLanguage,
  CountryLanguageDocument,
} from './schemas/countries-language.schema'

// Aquí irían los tipos de datos para los filtros y la ordenación
export type CountryLanguageFilter =
  | 'CountryCode'
  | 'Language'
  | 'IsOfficial'
  | 'Percentage'
export type CountryLanguageOrder = 'asc' | 'desc'

@Injectable()
export class CountriesLanguagesService {
  private logger = new Logger(CountriesLanguagesService.name)

  constructor(
    @InjectModel(CountryLanguage.name)
    private countryLanguageModel: PaginateModel<CountryLanguageDocument>,
  ) {}

  async findAll(): Promise<CountryLanguage[]> {
    return await this.countryLanguageModel.find().exec()
  }

  async findAllPaginated(
    page: number,
    pageSize: number,
    filter: CountryLanguageFilter,
    order: CountryLanguageOrder,
    search: string,
  ) {
    this.logger.log(
      `page: ${page}, pageSize: ${pageSize}, filter: ${filter}, order: ${order}, search: ${search}`,
    )
    // Aquí iría la query de búsqueda y filtrado
    const query = {
      [filter]: {
        $regex: `.*${search}.*`, // para que busque en cualquier parte del campo
        $options: 'i', // para que no distinga entre mayúsculas y minúsculas
      },
    }
    // Aquí iría la query de ordenación y paginación
    const options = {
      page,
      limit: pageSize,
      sort: { [filter]: order },
      collection: 'es_ES', // para que use la configuración de idioma de España
    }
    // lanzamos la operación de búsqueda y paginación
    // si no hay filtro, query será un objeto vacío, y no puede ser Percentage
    return await this.countryLanguageModel.paginate(
      filter !== 'Percentage' ? query : {},
      options,
    )
  }
}
