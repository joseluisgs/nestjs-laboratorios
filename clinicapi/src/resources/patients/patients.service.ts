import { Inject, Injectable } from '@nestjs/common'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Repository } from 'typeorm'
import { PatientEntity } from './entities/patient.entity'

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENT_REPOSITORY') private readonly patientRepository: Repository<PatientEntity>) {
  }

  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient'
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
