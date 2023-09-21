import { Inject, Injectable } from '@nestjs/common'

/**
 * Servicio que se encarga de verificar el estado de la API.
 */
@Injectable()
export class HealthCheckService {
  // Le ponemos la etiqueta @Inject para que sepa que tiene que inyectar
  /**
   * Inyectamos el estado de la conexión de la base de datos.
   * @param postgresDBConnectionStatus El estado de la conexión de la base de datos Posgres.
   * @param mongoDBConnectionStatus El estado de la conexión de la base de datos MongoDB.
   */
  constructor(@Inject('POSTGRES_CONNECTION_STATUS') // Nombre del provider que queremos inyectar
              private readonly postgresDBConnectionStatus: boolean,
              @Inject('MONGO_CONNECTION_STATUS') // Nombre del provider que queremos inyectar
              private readonly mongoDBConnectionStatus: boolean,
  ) {
  }

  /**
   * Devolver el estado de la API está bien, pero no incluyas información sensible.
   * o de que tipo de base de datos se trata.
   * Lo hacemos porque es para fines de demostración.
   * @returns El estado de la API
   */
  checkApiHeathStatus() {
    return {
      api_status: 'I am alive! :) 👍',
      postgres_status: this.postgresDBConnectionStatus
        ? 'CONNECTED'
        : 'DISCONNECTED',
      mongoDB_status: this.mongoDBConnectionStatus
        ? 'CONNECTED'
        : 'DISCONNECTED',
    }
  }
}
