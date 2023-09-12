import { Module } from '@nestjs/common'
import { ProductsModule } from './products/products.module'
import { ProvidersModule } from './providers/providers.module'
import { WarehousesModule } from './warehouses/warehouses.module'

// Módulo principal de la aplicación
// Se usa el decorador @Module() para definir el módulo
// Se importan los módulos necesarios
// Se definen los controladores y los servicios para el módulo
// De esta manera se hace la inyección de dependencias
@Module({
  imports: [ProductsModule, ProvidersModule, WarehousesModule], // Importamos los módulos
  controllers: [
    // AppController,
    // ProductsController,
  ],
  providers: [
    // AppService,
    // ProductsService,
  ],
})
export class AppModule {}
