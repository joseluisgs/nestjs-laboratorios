import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { PatientsService } from './patients.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientIdValidatorPipe } from './pipes/patient-id-validator.pipe'
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Patient } from './model/patient.model'

@Controller('patients')
@ApiTags('Patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Error interno de la api en bases de datos',
    type: Patient,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al crear el paciente',
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes',
    type: [Patient],
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  findAll() {
    return this.patientsService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado con éxito',
    type: Patient,
  })
  @ApiNotFoundResponse({
    description: 'Paciente no encontrado',
  })
  @ApiNotAcceptableResponse({
    description: 'El id del paciente no es válido',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  findOne(@Param('id', new PatientIdValidatorPipe()) id: string) {
    return this.patientsService.findOne(id)
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Paciente actualizado con éxito',
    type: Patient,
  })
  @ApiNotFoundResponse({
    description: 'Paciente no encontrado',
  })
  @ApiNotAcceptableResponse({
    description: 'El id del paciente no es válido',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  update(
    @Param('id', new PatientIdValidatorPipe()) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, updatePatientDto)
  }

  @Delete(':id')
  @HttpCode(204) // No Content
  @ApiResponse({
    status: 204,
    description: 'Paciente eliminado con éxito',
  })
  @ApiNotFoundResponse({
    description: 'Paciente no encontrado',
  })
  @ApiNotAcceptableResponse({
    description: 'El id del paciente no es válido',
  })
  remove(@Param('id', new PatientIdValidatorPipe()) id: string) {
    return this.patientsService.remove(id)
  }
}
