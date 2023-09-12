import { Module } from '@nestjs/common'
import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'

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
  providers: [
    //AppService,
    ProductsService,
  ],
})
export class AppModule {}
