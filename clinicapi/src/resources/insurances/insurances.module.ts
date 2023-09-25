import { Module } from '@nestjs/common'
import { InsurancesService } from './insurances.service'
import { InsurancesController } from './insurances.controller'
import { insuranceProviders } from './providers/insurances.providers'
import { DatabaseModule } from '../../database/database.module'
import { patientProviders } from '../patients/providers/patients.providers'
import { PatientsService } from '../patients/patients.service'

@Module({
  // importamos los módulos que vamos a usar
  // Importamos el módulo de la base de datos, porque vamos a inyectar la conexión de providers
  imports: [DatabaseModule],
  controllers: [InsurancesController],
  // inyectamos los providers de las dependencias que vamos a usar
  // usamos el spread operator para descomponer el array de providers
  // ya que insurances.providers.ts exporta un array de providers
  // Importamos los servicos de pacientes y seguros que vamos a usar
  providers: [InsurancesService, ...insuranceProviders, PatientsService, ...patientProviders],
  // Exportamos el servicio porque lo vamos a usar en el guard de pacientes
  exports: [InsurancesService],
})
export class InsurancesModule {
}
