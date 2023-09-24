import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll() {
    try {
      return await this.insuranceModel.find()
    } catch (error) {
      throw new DatabaseException('Error al obtener Aseguradoras en BD', error)
    }
  }

  async findOne(id: string) {
    let insuranceFound = null
    try {
      insuranceFound = await this.insuranceModel.findById(id)
    } catch (error) {
      throw new DatabaseException(
        `Error al obtener Aseguradora en BD con id:${id}`,
        error,
      )
    }
    if (!insuranceFound) {
      throw new NotFoundException(`No existe Aseguradora en BD con id:${id}`)
    }
    return insuranceFound
  }

  update(id: number, updateInsuranceDto: UpdateInsuranceDto) {
    return `This action updates a #${id} insurance`
  }

  remove(id: number) {
    return `This action removes a #${id} insurance`
  }
}
