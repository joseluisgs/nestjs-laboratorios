import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { AppService } from './app.service';

// Controlador de la clase AppController
// Define las rutas y la gestión de las peticiones
// Se usa el decorador @Controller() para definir la ruta
@Controller()
export class AppController {
  // Se inyecta el servicio AppService en el constructor
  constructor(private readonly appService: AppService) {}

  // Get para la ruta raíz
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // Get con param id para
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
  // Get con query param name
  @Get('/bug?')
  findByQuery(@Query('google') google: number) {
    return `This action returns a #${google} cat`;
  }
  // Post para la ruta raíz
  @Post()
  create(@Body() dto: any) {
    return dto;
  }
  // Put para la ruta raíz
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return {
      id,
      ...dto,
    };
  }
  // Delete para la ruta raíz
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
