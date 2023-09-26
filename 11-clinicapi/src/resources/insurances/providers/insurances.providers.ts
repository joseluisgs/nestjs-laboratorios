import { Logger } from '@nestjs/common'
import { Connection } from 'mongoose'
import { InsuranceSchema } from '../schemas/insurance.schema'


/**
 * Para gestionar y exportar los distintos providers de relacionados con insurances (seguros)
 * Se exporta un array de providers
 */
const logger = new Logger('INSURANCE PROVIDER')

/**
 * Array de providers de pacientes
 */
export const insuranceProviders = [
  {
    provide: 'INSURANCE_MODEL', // Nombre con el que se inyectará el repositorio/modelo de Mongoose
    useFactory: (connection: Connection) => {
      try {
        return connection.model('INSURANCES', InsuranceSchema) // Nombre de la colección en usar
      } catch (error) {
        logger.error('Error al cargar el Insurance Model', error)
      }
    },
    inject: ['MONGODB_CONNECTION'], // Dependencia que inyecta o que necesita
  },
]
