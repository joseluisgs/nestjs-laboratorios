import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: false,
    description: 'nombre de usuario',
    example: 'jhon'
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'apellido de usuario',
    example: 'doe'
  })
  surname: string;

/*  @ApiProperty({
    required: false,
    description: 'edad de usuario',
    examples: [18, 56, 99]
  })
  age: number;*/
}
