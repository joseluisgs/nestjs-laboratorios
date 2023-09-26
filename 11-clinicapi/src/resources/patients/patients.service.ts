import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Repository } from 'typeorm'
import { PatientEntity } from './entities/patient.entity'
import { DatabaseException } from '../../database/exceptions/database-exception/database-exception'

/**
 * Servicio que se encarga de gestionar los pacientes.
 * Los métodos asíncronos cuando vayamos a escribir en la base de datos (save, update, delete, etc)
 */
@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private readonly patientRepository: Repository<PatientEntity>,
  ) {
  }

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.patientRepository.save(createPatientDto)
    } catch (error) {
      throw new DatabaseException('Error al crear Paciente en BD', error)
    }
  }

  async findAll() {
    try {
      return await this.patientRepository.find()
    } catch (error) {
      throw new DatabaseException('Error al obtener Pacientes en BD', error)
    }
  }

  async findOne(id: string) {
    let patientToFound = null
    try {
      patientToFound = await this.patientRepository.findOneBy({ id })
    } catch (error) {
      throw new DatabaseException(
        `Error al obtener Paciente en BD con id:${id}`,
        error,
      )
    }
    if (!patientToFound) {
      throw new NotFoundException(`No existe Paciente en BD con id:${id}`)
    }
    return patientToFound
  }

  async findAllFilteredByName(patientName: string) {
    try {
      // return await this.patientRepository.find({ where: { name: patientName } })
      // Usamos QueryBuilder para hacer una consulta más compleja
      return await this.patientRepository.createQueryBuilder('patient')
        .where('patient.name LIKE :name', { name: `%${patientName}%` })
        .getMany()
    } catch (error) {
      throw new DatabaseException(`Error al obtener Pacientes filtrados por nombre ${patientName} en BD`, error)
    }
  }

  async findAllFilteredByQueryParams(query: string, value: string) {
    try {
      // Creamos una consulta dinámica en base a los parámetros de la petición
      return await this.patientRepository.createQueryBuilder('patient')
        .where(`patient.${query} LIKE :value`, { value: `%${value}%` })
        .getMany()
    } catch (error) {
      throw new DatabaseException(`Error al obtener Pacientes filtrados en BD con ${query}='${value}'`, error)
    }
  }

  async findAllByInsuranceId(insuranceId: string) {
    try {
      return await this.patientRepository.find({ where: { insuranceId: insuranceId } })
    } catch (error) {
      throw new DatabaseException(`Error al obtener Pacientes filtrados por insuranceId ${insuranceId} en BD`, error)
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patientToUpdate = await this.findOne(id)
    try {
      // usamos spread operator para copiar las propiedades de updatePatientDto en patientToUpdate
      const updatedPatient = { ...patientToUpdate, ...updatePatientDto }
      await this.patientRepository.update(id, updatedPatient)
      return updatedPatient
    } catch (error) {
      throw new DatabaseException(
        `Error al actualizar Paciente en BD con id: ${id}`,
        error,
      )
    }
  }

  async remove(id: string) {
    const patientToDelete = await this.findOne(id)
    try {
      await this.patientRepository.remove(patientToDelete)
    } catch (error) {
      throw new DatabaseException(
        `Error al eliminar Paciente en BD con id: ${id}`,
        error,
      )
    }
  }
}
