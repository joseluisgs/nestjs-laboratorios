import { Module } from '@nestjs/common'
import { PatientsService } from './patients.service'
import { PatientsController } from './patients.controller'
import { patientProviders } from './providers/patients.providers'
import { DatabaseModule } from '../../database/database.module'

@Module({
  imports: [DatabaseModule], // Importamos el módulo de la base de datos, porque vamos a inyectar la conexión de providers
  controllers: [PatientsController],
  // Inyectamos el servicio y los providers
  // usamos el spread operator para descomponer el array de providers y que no quede un array de arrays
  providers: [PatientsService, ...patientProviders],
})
export class PatientsModule {
}
