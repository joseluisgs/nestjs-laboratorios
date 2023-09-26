import { HttpException, HttpStatus, Logger } from '@nestjs/common'

/**
 * Creamos una excepción personalizada para el manejo de errores en la base de datos.
 */
export class DatabaseException extends HttpException {
  private logger = new Logger('DATABASE ERROR')

  constructor(errorMessage = 'Error en Bases de Datos', error: any) {
    super(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    this.logger.error(errorMessage, error)
  }
}
