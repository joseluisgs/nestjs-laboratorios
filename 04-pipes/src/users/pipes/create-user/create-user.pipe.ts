import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { CreateUserDto } from '../../dto/create-user.dto'
import { ObjectSchema } from 'joi' // Se debe instalar con npm i joi

@Injectable()
export class CreateUserPipe
  implements PipeTransform<CreateUserDto, CreateUserDto>
{
  constructor(private schema: ObjectSchema) {}

  transform(createSchema: CreateUserDto, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(createSchema) // Se valida el schema
    if (error) {
      throw new BadRequestException(error.message) // Si hay error se lanza una excepción
    }
    return createSchema // Si no hay error se retorna el schema
  }
}
