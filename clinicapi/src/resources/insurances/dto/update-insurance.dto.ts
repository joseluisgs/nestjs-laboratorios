import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateInsuranceDto } from './create-insurance.dto'
import { IsOptional } from 'class-validator'

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {
  @IsOptional()
  @ApiProperty({ required: false, description: 'Nombre de la aseguradora', example: 'Seguros Felicidad' })
  readonly name: string

  @IsOptional()
  @ApiProperty({ required: false, description: 'Dirección de la aseguradora', example: 'Calle 123' })
  readonly address: string

  @IsOptional()
  @ApiProperty({ required: false, description: 'Teléfono de la aseguradora', example: '+34-123456789' })
  readonly phone: string

  @IsOptional()
  @ApiProperty({ required: false, description: 'Email de la aseguradora', example: 'email@email.com' })
  readonly email: string

  @IsOptional()
  @ApiProperty({ required: true, description: 'Código postal de la aseguradora', example: '12345' })
  readonly postal_code: string
}
