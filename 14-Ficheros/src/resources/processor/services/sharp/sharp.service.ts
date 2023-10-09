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

  async convertFormatImage(
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
    try {
      if (convertProperties.options) {
        this.logger.debug(
          `Convirtiendo imagen a formato ${
            convertProperties.format
          } con opciones ${JSON.stringify(convertProperties.options)}`,
        )
        return await this.imageProcessor(imagePath)
          .toFormat(convertProperties.format, convertProperties.options)
          .toBuffer()
      }
      this.logger.debug(
        `Convirtiendo imagen a formato ${convertProperties.format}`,
      )
      return await this.imageProcessor(imagePath)
        .toFormat(convertProperties.format)
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async resizeImage(
    imageBuffer: Buffer,
    resizeProperties: {
      width?: number
      height?: number
      options?: {
        width?: number | undefined
        height?: number | undefined
        fit?: keyof sharp.FitEnum | undefined
        position?: number | string | undefined
        background?: sharp.Color | undefined
        kernel?: keyof sharp.KernelEnum | undefined
        withoutEnlargement?: boolean | undefined
        withoutReduction?: boolean | undefined
        fastShrinkOnLoad?: boolean | undefined
      }
    },
  ) {
    try {
      this.logger.debug(
        `Redimensionando imagen con propiedades ${JSON.stringify(
          resizeProperties,
        )}`,
      )
      return await this.imageProcessor(imageBuffer)
        .resize(resizeProperties.width, resizeProperties.height)
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async getImageBuffer(imagePath: string) {
    try {
      this.logger.debug(`Obteniendo buffer de la imagen ${imagePath}`)
      return await this.imageProcessor(imagePath).toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async cropImage(
    imageBuffer: Buffer,
    cropProperties: {
      left: number
      top: number
      width: number
      height: number
    },
  ) {
    try {
      this.logger.debug(
        `Recortando imagen con propiedades ${JSON.stringify(cropProperties)}`,
      )
      return await this.imageProcessor(imageBuffer)
        .extract(cropProperties)
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async rotateImage(
    imageBuffer: Buffer,
    rotateProperties: { angle?: number; options?: sharp.RotateOptions },
  ) {
    try {
      this.logger.debug(
        `Rotando imagen con propiedades ${JSON.stringify(rotateProperties)}`,
      )
      return await this.imageProcessor(imageBuffer)
        .rotate(rotateProperties.angle, rotateProperties.options)
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async verticalFlipImage(imageBuffer: Buffer) {
    try {
      this.logger.debug(`Volteando imagen verticalmente`)
      return await this.imageProcessor(imageBuffer).flip().toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async horizontalFlipImage(imageBuffer: Buffer) {
    try {
      this.logger.debug(`Volteando imagen horizontalmente`)
      return await this.imageProcessor(imageBuffer).flop().toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async effectsImage(
    imageBuffer: Buffer,
    effectsProperties: {
      treshold?: number
      tresholdGrayscale?: boolean
      median?: number
      blur?: number
      negate?: boolean
      grayscale?: boolean
      brightness?: number
      saturation?: number
      hue?: number
      lightness?: number
      tint?: sharp.Color
      sharpness?: number
    },
  ) {
    try {
      this.logger.debug(
        `Aplicando efectos a la imagen con propiedades ${JSON.stringify(
          effectsProperties,
        )}`,
      )

      if (effectsProperties.treshold) {
        imageBuffer = await this.imageProcessor(imageBuffer)
          .threshold(effectsProperties.treshold || 128, {
            grayscale: effectsProperties.tresholdGrayscale || false,
          })
          .toBuffer()
      }

      if (effectsProperties.tint) {
        imageBuffer = await this.imageProcessor(imageBuffer)
          .tint(effectsProperties.tint)
          .toBuffer()
      }

      return await this.imageProcessor(imageBuffer)
        .median(effectsProperties.median || 3)
        .blur(effectsProperties.blur || 0.3)
        .negate(effectsProperties.negate || false)
        .grayscale(effectsProperties.grayscale || false)
        .modulate({
          brightness: effectsProperties.brightness || 1,
          saturation: effectsProperties.saturation || 1,
          hue: effectsProperties.hue || 0,
          lightness: effectsProperties.lightness || 1,
        })
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async trimImage(imageBuffer: Buffer, trimLevel: number) {
    try {
      this.logger.debug(
        `Recortando imagen con propiedades ${JSON.stringify(trimLevel)}`,
      )
      return await this.imageProcessor(imageBuffer).trim(trimLevel).toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async setTransparencyBackground(
    imageBuffer: Buffer,
    transparencyBackground: sharp.Color,
  ) {
    try {
      this.logger.debug(
        `Aplanando imagen con propiedades ${JSON.stringify(
          transparencyBackground,
        )}`,
      )
      return await this.imageProcessor(imageBuffer)
        .flatten({ background: transparencyBackground })
        .toBuffer()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
