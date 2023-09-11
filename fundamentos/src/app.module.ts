import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulo principal de la aplicación
// Se usa el decorador @Module() para definir el módulo
// Se importan los módulos necesarios
// Se definen los controladores y los servicios para el módulo
// De esta manera se hace la inyección de dependencias
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
