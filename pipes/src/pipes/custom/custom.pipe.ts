import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class CustomPipe implements PipeTransform<string, number> {
  // El método transform() es el que se ejecuta cuando se usa el pipe
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(`${value} no es un número válido`)
    }
    return val
  }
}
