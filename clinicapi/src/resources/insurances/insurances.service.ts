import { Inject, Injectable } from '@nestjs/common'
import { CreateInsuranceDto } from './dto/create-insurance.dto'
import { UpdateInsuranceDto } from './dto/update-insurance.dto'
import { Model } from 'mongoose'
import { Insurance } from './model/insurance.model'
import { DatabaseException } from '../../database/exceptions/database-exception/database-exception'

@Injectable()
export class InsurancesService {
  constructor(@Inject('INSURANCE_MODEL') private readonly insuranceModel: Model<Insurance>) {
  }

  async create(createInsuranceDto: CreateInsuranceDto) {
    try {
      return await this.insuranceModel.create(createInsuranceDto)
    } catch (error) {
      throw new DatabaseException('Error al crear Aseguradora en BD', error)
    }
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
