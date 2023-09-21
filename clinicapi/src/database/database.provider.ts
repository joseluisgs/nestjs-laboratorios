import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm' // Importante
import * as mongoose from 'mongoose'
import { PatientEntity } from '../resources/patients/entities/patient.entity'

/**
 * Proveedor encargado de la conexión con la base de datos
 */

// Logger
const logger = new Logger('DATABASE PROVIDER')

// Constante que encapsula la conexión a la base de datos
export const databaseProviders = [
  {
    provide: 'POSTGRES_CONNECTION', // Nombre con el que se inyectará la conexión
    // Inyectamos la conexión a la base de datos y conectamos
    useFactory: () => new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT_POSTGRES) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [PatientEntity], // Ponemos las entidades a gestionar por TypeORM
      synchronize: process.env.NODE_ENV === 'development', // Sincronizar la base de datos si estamos en entorno de desarrollo
    }).initialize()
      .then((connection) => {
        logger.debug('¡🟢 connexion con Postgres realizada con éxito!')
        return connection
      })
      .catch((error) => {
        logger.error('🔴 error al conectar con Postgres', error)
      }),
  },
  // Inyectamos la conexión a la base de datos y conectamos
  {
    provide: 'MONGODB_CONNECTION', // Nombre con el que se inyectará la conexión
    useFactory: () =>
      mongoose
        .connect(
          `mongodb://${process.env.DATABASE_USER}:${
            process.env.DATABASE_PASSWORD
          }@${process.env.MONGO_DATABASE_HOST}:${
            process.env.DATABASE_PORT_MONGODB || 27017
          }/${process.env.DATABASE_NAME}`,
        )
        .then((connection) => {
          logger.debug('¡🟢 connexion con Mongodb realizada con éxito!')
          return connection
        })
        .catch((error) => {
          logger.error('🔴 error al conectar con Mongodb', error)
        }),
  },
]