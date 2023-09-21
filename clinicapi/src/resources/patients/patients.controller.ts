import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { PatientsService } from './patients.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto)
  }

  @Get()
  findAll() {
    return this.patientsService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: () => {
        throw new NotAcceptableException('El id no es válido')
      },
    })) id: string) {
    return this.patientsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id)
  }
}
