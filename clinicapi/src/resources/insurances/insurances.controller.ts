import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { InsurancesService } from './insurances.service'
import { CreateInsuranceDto } from './dto/create-insurance.dto'
import { UpdateInsuranceDto } from './dto/update-insurance.dto'
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Insurance } from './model/insurance.model'
import { InsuranceIdValidatorPipe } from './pipes/Insurance-id-validator.pipe'


@Controller('insurances')
@ApiTags('Insurances')
export class InsurancesController {
  constructor(private readonly insurancesService: InsurancesService) {
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Aseguradora creada con éxito',
    type: Insurance,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insurancesService.create(createInsuranceDto)
  }

  @Get()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de aseguradoras',
    type: [Insurance],
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  findAll() {
    return this.insurancesService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Aseguradora encontrada con éxito',
    type: Insurance,
  })
  @ApiNotFoundResponse({
    description: 'Aseguradora no encontrada',
  })
  @ApiNotAcceptableResponse({
    description: 'El id de la aseguradora no es válido',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno de la api en bases de datos',
  })
  findOne(@Param('id', new InsuranceIdValidatorPipe()) id: string) {
    return this.insurancesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insurancesService.update(+id, updateInsuranceDto)
  }

  @Delete(':id')
  @HttpCode(204) // No Content
  remove(@Param('id') id: string) {
    return this.insurancesService.remove(+id)
  }
}
