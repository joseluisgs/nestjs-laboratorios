import { Module } from '@nestjs/common'
import { InsurancesService } from './insurances.service'
import { InsurancesController } from './insurances.controller'
import { insuranceProviders } from './providers/insurances.providers'
import { DatabaseModule } from '../../database/database.module'

@Module({
  // importamos los módulos que vamos a usar
  imports: [DatabaseModule], // Importamos el módulo de la base de datos, porque vamos a inyectar la conexión de providers
  controllers: [InsurancesController],
  // inyectamos los providers de las dependencias que vamos a usar
  // usamos el spread operator para descomponer el array de providers
  // ya que insurances.providers.ts exporta un array de providers
  providers: [InsurancesService, ...insuranceProviders],
})
export class InsurancesModule {
}
