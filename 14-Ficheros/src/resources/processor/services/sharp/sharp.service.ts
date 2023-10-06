import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import * as sharp from 'sharp'

@Injectable()
export class SharpService {
  private readonly logger = new Logger(SharpService.name)
  private readonly imageProcessor = sharp // sharp es una librería para procesar imágenes

  constructor() {
    this.imageProcessor.cache(false) // deshabilitamos el cache para que no se guarde en disco
  }

  // Obtener metadata de la imagen
  async getMetadata(imagePath: string) {
    try {
      this.logger.debug(`Obteniendo metadata de la imagen`)
      return await this.imageProcessor(imagePath).metadata()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  // Obtener estadísticas de la imagen
  async getStats(imagePath: string) {
    try {
      this.logger.debug(`Obteniendo estadísticas de la imagen`)
      return await this.imageProcessor(imagePath).stats()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
