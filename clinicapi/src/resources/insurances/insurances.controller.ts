import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { InsurancesService } from './insurances.service'
import { CreateInsuranceDto } from './dto/create-insurance.dto'
import { UpdateInsuranceDto } from './dto/update-insurance.dto'
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Insurance } from './model/insurance.model'

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
  findAll() {
    return this.insurancesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insurancesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insurancesService.update(+id, updateInsuranceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insurancesService.remove(+id)
  }
}
