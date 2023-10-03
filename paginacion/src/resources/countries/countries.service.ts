import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Country } from './entities/country.entity'
import { Repository } from 'typeorm'
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate'

@Injectable()
export class CountriesService {
  // Inmyectamos el repositorio de la entidad Country
  constructor(
    @InjectRepository(Country) private countriesRepository: Repository<Country>,
  ) {}

  async findPaginated(query: PaginateQuery): Promise<Paginated<Country>> {
    // usamos nest-paginate
    // https://github.com/ppetzold/nestjs-paginate
    return await paginate(query, this.countriesRepository, {
      // 1. Definimos las columnas por las que se puede ordenar
      sortableColumns: [
        'code',
        'name',
        'continent',
        'region',
        'surfaceArea',
        'indepYear',
        'population',
        'lifeExpectancy',
        'gnp',
        'gnpOld',
        'localName',
        'governmentForm',
        'headOfState',
        'capital',
        'code2',
      ],
      // 2. Definimos las columnas por las que se puede filtrar
      searchableColumns: [
        'code',
        'name',
        'region',
        'surfaceArea',
        'indepYear',
        'localName',
        'headOfState',
      ],
      // 3. Definimos la ordenación por defecto columna y orden (ASC o DESC)
      defaultSortBy: [['code', 'ASC']],
      // 4. Definimos las columnas por las que se puede filtrar con operadores
      filterableColumns: {
        // sobre la columna population se pueden usar los operadores EQ, GT, LT
        population: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.LT],
      },
      // 5. Definimos el límite máximo de registros por página
      maxLimit: 200,
    })
    // return this.countryRepository.find();
  }
}
