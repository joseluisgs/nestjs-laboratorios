import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Repository } from 'typeorm'
import { PatientEntity } from './entities/patient.entity'

/**
 * Servicio que se encarga de gestionar los pacientes.
 * Los métodos asíncronos cuando vayamos a escribir en la base de datos (save, update, delete, etc)
 */
@Injectable()
export class PatientsService {
  private logger = new Logger(PatientsService.name)

  constructor(
    @Inject('PATIENT_REPOSITORY') private readonly patientRepository: Repository<PatientEntity>) {
  }

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.patientRepository.save(createPatientDto)
    } catch (e) {
      const errorMessage = 'Error al crear Paciente en BD'
      this.logger.error(errorMessage, e)
      throw new InternalServerErrorException(errorMessage)
    }
  }

  async findAll() {
    try {
      return await this.patientRepository.find()
    } catch (e) {
      const errorMessage = 'Error al obtener Pacientes en BD'
      this.logger.error(errorMessage, e)
      throw new InternalServerErrorException(errorMessage)
    }
  }

  async findOne(id: string) {
    let patientFound = null
    try {
      patientFound = await this.patientRepository.findOneBy({ id })
    } catch (e) {
      const errorMessage = 'Error al obtener Paciente en BD con id: ' + id
      this.logger.error(errorMessage, e)
      throw new InternalServerErrorException(errorMessage)
    }
    if (!patientFound) {
      const errorMessage = 'No existe Paciente en BD con id: ' + id
      this.logger.error(errorMessage)
      throw new NotFoundException(errorMessage)
    }
    return patientFound
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
