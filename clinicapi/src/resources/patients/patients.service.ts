import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
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
  private logger = new Logger(PatientsService.name)

  constructor(
    @Inject('PATIENT_REPOSITORY')
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.patientRepository.save(createPatientDto)
    } catch (e) {
      throw new DatabaseException('Error al crear Paciente en BD', e)
    }
  }

  async findAll() {
    try {
      return await this.patientRepository.find()
    } catch (e) {
      throw new DatabaseException('Error al obtener Pacientes en BD', e)
    }
  }

  async findOne(id: string) {
    let patientFound = null
    try {
      patientFound = await this.patientRepository.findOneBy({ id })
    } catch (e) {
      throw new DatabaseException(
        `Error al obtener Paciente en BD con id:${id}`,
        e,
      )
    }
    if (!patientFound) {
      throw new NotFoundException(`No existe Paciente en BD con id:${id}`)
    }
    return patientFound
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patientToUpdate = await this.findOne(id)
    try {
      // usamos spread operator para copiar las propiedades de updatePatientDto en patientToUpdate
      const updatedPatient = { ...patientToUpdate, ...updatePatientDto }
      await this.patientRepository.update(id, updatedPatient)
      return updatedPatient
    } catch (e) {
      throw new DatabaseException(
        `Error al actualizar Paciente en BD con id:${id}`,
        e,
      )
    }
  }

  async remove(id: string) {
    const patientToDelete = await this.findOne(id.toString())
    try {
      await this.patientRepository.remove(patientToDelete)
    } catch (e) {
      throw new DatabaseException(
        `Error al eliminar Paciente en BD con id:${id}`,
        e,
      )
    }
  }
}
