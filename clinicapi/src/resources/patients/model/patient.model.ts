import { ApiProperty } from '@nestjs/swagger'

/**
 * Paciente Model para documentar y otras cosas
 */
export class Patient {
  @ApiProperty({
    description: 'Identificador único del paciente en formato UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  readonly id: string

  @ApiProperty({
    description: 'Nombre del paciente',
    example: 'Jhon',
    required: true,
  })
  readonly name: string

  @ApiProperty({
    description: 'Apellidos del paciente',
    example: 'Doe',
    required: true,
  })
  readonly lastname: string

  @ApiProperty({
    description: 'Teléfono del paciente',
    example: '123456789',
    required: true,
  })
  readonly phone: string

  @ApiProperty({
    description: 'Email del paciente',
    example: 'john.doe@mymail.com',
    required: true,
  })
  readonly email: string

  @ApiProperty({
    description: 'Edad del paciente',
    example: 25,
    required: true,
  })
  readonly age: number

  @ApiProperty({
    description: 'Dirección del paciente',
    example: 'Calle 123',
    required: false,
  })
  readonly address: string
}
