import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { PatientEntity } from '../entities/patient.entity'

/**
 * Para gestionar y exportar los distintos providers de relacionados con pacientes
 */
const logger = new Logger('PATIENT PROVIDER')

/**
 * Array de providers de pacientes
 */
export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY', // Nombre con el que se inyectará el repositorio
    useFactory: (connection: DataSource) => {
      try {
        return connection.getRepository(PatientEntity)
      } catch (error) {
        logger.error('Error al cargar el Patient Repository', error)
      }
    },
    inject: ['POSTGRES_CONNECTION'], // Dependencia que inyecta
  },
]
