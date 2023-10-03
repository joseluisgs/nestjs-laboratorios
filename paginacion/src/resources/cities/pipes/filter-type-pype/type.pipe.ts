import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class TypePipe implements PipeTransform {
  constructor(
    private types: string[],
    private message = 'El tipo no es válido',
  ) {}

  transform(type: string) {
    if (type && !this.types.includes(type)) {
      throw new BadRequestException(`${this.message}: ${type}`)
    }
  }
}
