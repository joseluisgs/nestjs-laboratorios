import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel } from 'mongoose' // has necesitado importar el esquema en el createFactory del esquema
import {
  CountryLanguage,
  CountryLanguageDocument,
} from './schemas/countries-language.schema'

@Injectable()
export class CountriesLanguagesService {
  constructor(
    @InjectModel(CountryLanguage.name)
    private countryLanguageModel: PaginateModel<CountryLanguageDocument>,
  ) {}

  async findAll(): Promise<CountryLanguage[]> {
    return await this.countryLanguageModel.find().exec()
  }
}
