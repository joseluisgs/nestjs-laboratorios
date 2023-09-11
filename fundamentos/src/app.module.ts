import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ProductsController } from './products/products.controller'

// Módulo principal de la aplicación
// Se usa el decorador @Module() para definir el módulo
// Se importan los módulos necesarios
// Se definen los controladores y los servicios para el módulo
// De esta manera se hace la inyección de dependencias
@Module({
  imports: [],
  controllers: [
    // AppController,
    ProductsController,
  ],
  providers: [AppService],
})
export class AppModule {}
