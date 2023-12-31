import { DataSource } from 'typeorm'
import { Logger } from '@nestjs/common'
import { Mongoose } from 'mongoose'

/**
 * Esto no es una buena práctica, cuanto menos se sepa de la base de datos mejor.
 */
const logger = new Logger('HEALTH-CHECK PROVIDER')
export const databaseProviders = [
  {
    // Este será el nombre que usaré para inyectarme
    provide: 'POSTGRES_CONNECTION_STATUS', // Nombre con el que lo inyectaré
    useFactory: (connection: DataSource) => {
      try {
        return connection.isInitialized
      } catch (error) {
        logger.error(
          'error al verificar estado de conexión con Postgres',
          error,
        )
        return false
      }
    },
    inject: ['POSTGRES_CONNECTION'], // dependencia que inyecta
  },
  {
    provide: 'MONGO_CONNECTION_STATUS',
    useFactory: (connection: Mongoose) => {
      try {
        return connection.connection.readyState === 1
      } catch (error) {
        logger.error('error al verificar estado de conexión con MongoDB', error)
        return false
      }
    },
    inject: ['MONGODB_CONNECTION'], // dependencia que inyecta
  },
]
