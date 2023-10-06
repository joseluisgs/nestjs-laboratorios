import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { CountryLanguage } from './schemas/countries-language.schema'
import { CountriesLanguagesController } from './countries-languages.controller'
import { CountriesLanguagesService } from './countries-languages.service'
import * as mongoosePaginate from 'mongoose-paginate-v2'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CountryLanguage.name,
        useFactory: () => {
          const schema = SchemaFactory.createForClass(CountryLanguage)
          schema.plugin(mongoosePaginate)
          return schema
        },
      },
    ]),
  ],
  controllers: [CountriesLanguagesController],
  providers: [CountriesLanguagesService],
})
export class CountriesLanguagesModule {}
