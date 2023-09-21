import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
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
      const errorMessages = 'Error al crear Paciente en BD'
      this.logger.error(errorMessages, e)
      throw new InternalServerErrorException('Error al crear Paciente en BD')
    }
  }

  findAll() {
    return this.patientRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
