import { Module } from '@nestjs/common'
import { HealthCheckController } from './health-check.controller'
import { HealthCheckService } from './health-check.service'
import { databaseProviders } from './providers/database.provider'
import { DatabaseModule } from '../../database/database.module'

@Module({
  // Vamos a importar el módulo de la base de datos para poder inyectar la conexión
  imports: [DatabaseModule], // Importamos el módulo de la base de datos, porque vamos a inyectar la conexión de providers
  controllers: [HealthCheckController],
  // Inyectamos el servicio y los providers de la base de datos
  // Uso el spread operator para descomponer el array de providers y que no quede un array de arrays
  providers: [HealthCheckService, ...databaseProviders],
})
export class HealthCheckModule {}
