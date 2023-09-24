import { IsNotEmpty } from 'class-validator'

/**
 * Dto for creating a new insurance
 */
export class CreateInsuranceDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })

  readonly name: string
  readonly address: string
  readonly phone: string
  readonly email: string
  readonly postal_code: string
}
