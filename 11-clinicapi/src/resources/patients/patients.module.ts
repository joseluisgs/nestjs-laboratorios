import { Module } from '@nestjs/common'
import { PatientsService } from './patients.service'
import { PatientsController } from './patients.controller'
import { patientProviders } from './providers/patients.providers'
import { DatabaseModule } from '../../database/database.module'
import { InsurancesModule } from '../insurances/insurances.module'

@Module({
  // Importamos el módulo de la base de datos, porque vamos a inyectar la conexión de providers
  // Importamos el módulo de seguros porque vamos a usar el servicio de seguros en el guard de pacientes
  imports: [DatabaseModule, InsurancesModule],
  controllers: [PatientsController],
  // Inyectamos el servicio y los providers
  // usamos el spread operator para descomponer el array de providers y que no quede un array de arrays
  providers: [PatientsService, ...patientProviders],
  // Exportamos el servicio para que pueda ser usado en otros módulos
  exports: [PatientsService],

})
export class PatientsModule {
}
