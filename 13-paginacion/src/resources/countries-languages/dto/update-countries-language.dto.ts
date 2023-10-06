import { PartialType } from '@nestjs/mapped-types';
import { CreateCountriesLanguageDto } from './create-countries-language.dto';

export class UpdateCountriesLanguageDto extends PartialType(CreateCountriesLanguageDto) {}
