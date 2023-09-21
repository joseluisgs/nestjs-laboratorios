import { Module } from '@nestjs/common'
import { databaseProviders } from './database.provider'


/**
 * Módulo encargado de la conexión con la base de datos
 */
@Module({
  // Carga los providers de la conexión con la base de datos
  providers: [...databaseProviders],
  // Exporta los providers de la conexión con la base de datos
  // Uso el spread operator para descomponer el array de providers y que no quede un array de arrays
  exports: [...databaseProviders], // Los vamos a usar en otro lado
})
export class DatabaseModule {
}
