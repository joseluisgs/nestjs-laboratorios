import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';

@Controller('insurances')
export class InsurancesController {
  constructor(private readonly insurancesService: InsurancesService) {}

  @Post()
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insurancesService.create(createInsuranceDto);
  }

  @Get()
  findAll() {
    return this.insurancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insurancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insurancesService.update(+id, updateInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insurancesService.remove(+id);
  }
}
