import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInsuranceDto } from './dto/create-insurance.dto'
import { UpdateInsuranceDto } from './dto/update-insurance.dto'
import { Model } from 'mongoose'
import { Insurance } from './model/insurance.model'
import { DatabaseException } from '../../database/exceptions/database-exception/database-exception'
import { PatientsService } from '../patients/patients.service'

@Injectable()
export class InsurancesService {
  constructor(
    @Inject('INSURANCE_MODEL')
    private readonly insuranceModel: Model<Insurance>,
    // No hace falta poner el @Inject('PATIENT_REPOSITORY') porque ya está inyectado en el módulo de pacientes
    // Ademas no es una buena práctica, ya que se hace referencia a la instancia del objeto
    // Un repository solo debería hablar con su servicio, por eso importamos el servicio y no el repositorio.
    private readonly patientsService: PatientsService,
  ) {
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

  async findPatientsByInsuranceId(id: string) {
    const insuranceToFound = await this.findOne(id)
    try {
      return await this.patientsService.findAllByInsuranceId(id)
    } catch (error) {
      throw new DatabaseException('Error al obtener Aseguradoras en BD', error)
    }
  }

  async findOne(id: string) {
    let insuranceToFound = null
    try {
      insuranceToFound = await this.insuranceModel.findById(id)
    } catch (error) {
      throw new DatabaseException(
        `Error al obtener Aseguradora en BD con id: ${id}`,
        error,
      )
    }
    if (!insuranceToFound) {
      throw new NotFoundException(`No existe Aseguradora en BD con id: ${id}`)
    }
    return insuranceToFound
  }

  async update(id: string, updateInsuranceDto: UpdateInsuranceDto) {
    const insuranceToUpdate = await this.findOne(id)
    try {
      //Le pasamos el id del paciente a actualizar y el objeto con los datos a actualizar
      // le ponemos el {new:true} para que nos devuelva el objeto actualizado, y no el anterior
      return await this.insuranceModel.findByIdAndUpdate(id, updateInsuranceDto, { new: true })
    } catch (error) {
      throw new DatabaseException(
        `Error al actualizar Paciente en BD con id: ${id}`,
        error,
      )
    }
  }

  async remove(id: string) {
    const insuranceToDelete = await this.findOne(id)
    try {
      await this.insuranceModel.findOneAndDelete(insuranceToDelete)
    } catch (error) {
      throw new DatabaseException(
        `Error al eliminar Paciente en BD con id: ${id}`,
        error,
      )
    }
  }
}
