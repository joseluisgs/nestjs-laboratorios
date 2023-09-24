import { PartialType } from '@nestjs/swagger';
import { CreateInsuranceDto } from './create-insurance.dto';

export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {}
