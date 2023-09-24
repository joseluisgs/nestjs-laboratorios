import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateInsuranceDto } from './dto/create-insurance.dto'
import { UpdateInsuranceDto } from './dto/update-insurance.dto'
import { Model } from 'mongoose'
import { Insurance } from './model/insurance.model'

@Injectable()
export class InsurancesService {
  private logger = new Logger(InsurancesService.name)

  constructor(@Inject('INSURANCE_MODEL') private readonly insuranceModel: Model<Insurance>) {
  }

  create(createInsuranceDto: CreateInsuranceDto) {
    return 'This action adds a new insurance'
  }

  findAll() {
    return `This action returns all insurances`
  }

  findOne(id: number) {
    return `This action returns a #${id} insurance`
  }

  update(id: number, updateInsuranceDto: UpdateInsuranceDto) {
    return `This action updates a #${id} insurance`
  }

  remove(id: number) {
    return `This action removes a #${id} insurance`
  }
}
