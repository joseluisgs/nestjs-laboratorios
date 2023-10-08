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
  async getMetadata(imageBuffer: Buffer) {
    try {
      this.logger.debug(`Obteniendo metadata de la imagen`)
      return await this.imageProcessor(imageBuffer).metadata()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  // Obtener estadísticas de la imagen
  async getStats(imageBuffer: Buffer) {
    try {
      this.logger.debug(`Obteniendo estadísticas de la imagen`)
      return await this.imageProcessor(imageBuffer).stats()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async storeImage(imageBuffer: Buffer, path: string, imageName: string) {
    try {
      this.logger.debug(`Guardando imagen en ${path}`)
      return await this.imageProcessor(imageBuffer).toFile(
        `${path}/${imageName}`,
      )
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  convertFormatImage(
    imagePath: string,
    convertProperties: {
      format: keyof sharp.FormatEnum
      options?:
        | sharp.OutputOptions
        | sharp.JpegOptions
        | sharp.PngOptions
        | sharp.WebpOptions
        | sharp.AvifOptions
        | sharp.HeifOptions
        | sharp.JxlOptions
        | sharp.GifOptions
        | sharp.Jp2Options
        | sharp.TiffOptions
    },
  ) {
    this.logger.debug(
      `Convirtiendo imagen a formato ${convertProperties.format}`,
    )
    try {
      if (convertProperties.options) {
        this.logger.debug(
          `Convirtiendo imagen a formato ${
            convertProperties.format
          } con opciones ${JSON.stringify(convertProperties.options)}`,
        )
        return this.imageProcessor(imagePath)
          .toFormat(convertProperties.format, convertProperties.options)
          .toBuffer()
      }
      this.logger.debug(
        `Convirtiendo imagen a formato ${convertProperties.format}`,
      )
      return this.imageProcessor(imagePath)
        .toFormat(convertProperties.format)
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
