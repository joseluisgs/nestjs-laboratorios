import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Country } from './entities/country.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CountriesService {
  // Inmyectamos el repositorio de la entidad Country
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async findAll() {
    return await this.countryRepository.find()
  }
}
