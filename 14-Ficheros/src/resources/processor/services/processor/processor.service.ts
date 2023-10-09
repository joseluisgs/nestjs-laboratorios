import { Injectable, Logger } from '@nestjs/common'
import { SharpService } from '../sharp/sharp.service'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { ImageProperties } from '../../models/imageProperties.model'

@Injectable()
export class ProcessorService {
  private readonly logger = new Logger(ProcessorService.name)

  // Inyectamos el servicio SharpService
  constructor(private readonly sharpService: SharpService) {}

  async getMetadata(image: Express.Multer.File) {
    return await this.sharpService.getMetadata(image.buffer)
  }

  async getStats(image: Express.Multer.File) {
    return await this.sharpService.getStats(image.buffer)
  }

  async storeImage(image: Express.Multer.File) {
    return await this.sharpService.storeImage(
      image.buffer,
      './uploads',
      uuidv4() + extname(image.originalname),
    )
  }

  async processImage(
    image: Express.Multer.File,
    imageProperties: ImageProperties,
  ) {
    this.logger.log(
      `Procesando imagen: ${image.path} con ${JSON.stringify(imageProperties)}`,
    )

    // Obtenemos la ruta y el nombre de la imagen
    const imagePath = image.path
    const imageName = image.filename.split('.')[0] // Obtenemos el nombre de la imagen sin la extensión
    let imageBuffer = await this.sharpService.getImageBuffer(imagePath) // Obtenemos el buffer de la imagen

    // Para cambiar el formato de la imagen
    if (imageProperties.convertProperties) {
      this.logger.debug(
        `Llamando a convertFormatImage con ${JSON.stringify(
          imageProperties.convertProperties,
        )}`,
      )
      imageBuffer = await this.sharpService.convertFormatImage(
        imagePath,
        imageProperties.convertProperties,
      )
    }

    // Para cambiar el tamaño de la imagen
    if (imageProperties.resizeProperties) {
      this.logger.debug(
        `Llamando a resizeImage con ${JSON.stringify(
          imageProperties.resizeProperties,
        )}`,
      )
      imageBuffer = await this.sharpService.resizeImage(
        imageBuffer,
        imageProperties.resizeProperties,
      )
    }

    // Guardamos la imagen en disco y devolvemos el nombre de la imagen
    const { format } = await this.sharpService.getMetadata(imageBuffer)
    return await this.sharpService.storeImage(
      imageBuffer,
      './uploads',
      `${imageName}.${format}`,
    )
  }
}
