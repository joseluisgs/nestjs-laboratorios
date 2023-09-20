import { Module } from '@nestjs/common'
import { databaseProviders } from './database.provider'


/**
 * Módulo encargado de la conexión con la base de datos
 */
@Module({
  // Carga los providers de la conexión con la base de datos
  providers: [...databaseProviders],
  // Exporta los providers de la conexión con la base de datos
  exports: [...databaseProviders],
})
export class DatabaseModule {
}
