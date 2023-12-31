import { Injectable, Logger } from '@nestjs/common'
import { SharpService } from '../sharp/sharp.service'
import { basename, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { ImageProperties } from '../../models/imageProperties.model'
import {
  PROCESSED_IMAGE_PATH,
  UPLOADS_IMAGE_PATH,
} from '../../../constant/path.constants'
import * as fs from 'fs'

@Injectable()
export class ProcessorService {
  private readonly logger = new Logger(ProcessorService.name)

  // Inyectamos el servicio SharpService
  constructor(private readonly sharpService: SharpService) {
    this.logger.log(
      'Creando instancia de ProcessorController y creando las carpetas necesarias',
    )
    if (!fs.existsSync(UPLOADS_IMAGE_PATH)) {
      this.logger.log(`Creando carpeta ${UPLOADS_IMAGE_PATH}`)
      fs.mkdirSync(UPLOADS_IMAGE_PATH)
    }
    if (!fs.existsSync(PROCESSED_IMAGE_PATH)) {
      this.logger.log(`Creando carpeta ${PROCESSED_IMAGE_PATH}`)
      fs.mkdirSync(PROCESSED_IMAGE_PATH)
    }
  }

  async getMetadata(image: Express.Multer.File) {
    return await this.sharpService.getMetadata(image.buffer)
  }

  async getStats(image: Express.Multer.File) {
    return await this.sharpService.getStats(image.buffer)
  }

  async storeImage(image: Express.Multer.File) {
    return await this.sharpService.storeImage(
      image.buffer,
      PROCESSED_IMAGE_PATH,
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
    const imageName = basename(imagePath, extname(image.filename))
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

    // Para cortar la imagen
    if (imageProperties.cropProperties) {
      this.logger.debug(
        `Llamando a cropImage con ${JSON.stringify(
          imageProperties.cropProperties,
        )}`,
      )
      imageBuffer = await this.sharpService.cropImage(
        imageBuffer,
        imageProperties.cropProperties,
      )
    }

    // Para rotar la imagen
    if (imageProperties.rotateProperties) {
      this.logger.debug(
        `Llamando a rotateImage con ${JSON.stringify(
          imageProperties.rotateProperties,
        )}`,
      )
      imageBuffer = await this.sharpService.rotateImage(
        imageBuffer,
        imageProperties.rotateProperties,
      )
    }

    // Para invertir una imagen verticalmente
    if (imageProperties.verticalFlip) {
      this.logger.debug(`Llamando a verticalFlipImage`)
      imageBuffer = await this.sharpService.verticalFlipImage(imageBuffer)
    }

    // Para invertir una imagen horizontalmente
    if (imageProperties.horizontalFlip) {
      this.logger.debug(`Llamando a horizontalFlipImage`)
      imageBuffer = await this.sharpService.horizontalFlipImage(imageBuffer)
    }

    // si tienes efectos
    if (imageProperties.effectsProperties) {
      this.logger.debug(
        `Llamando a applyEffectsImage con ${JSON.stringify(
          imageProperties.effectsProperties,
        )}`,
      )
      imageBuffer = await this.sharpService.effectsImage(
        imageBuffer,
        imageProperties.effectsProperties,
      )
    }

    // Si tiene trim
    if (imageProperties.trimLevel) {
      this.logger.debug(
        `Llamando a trimImage con ${JSON.stringify(imageProperties.trimLevel)}`,
      )
      imageBuffer = await this.sharpService.trimImage(
        imageBuffer,
        imageProperties.trimLevel,
      )
    }

    // si tiene transparencyBackground
    if (imageProperties.transparencyBackground) {
      this.logger.debug(
        `Llamando a applyTransparencyImage con ${JSON.stringify(
          imageProperties.transparencyBackground,
        )}`,
      )
      imageBuffer = await this.sharpService.setTransparencyBackground(
        imageBuffer,
        imageProperties.transparencyBackground,
      )
    }

    // Guardamos la imagen en disco y devolvemos el nombre de la imagen
    const { format } = await this.sharpService.getMetadata(imageBuffer)
    return await this.sharpService.storeImage(
      imageBuffer,
      PROCESSED_IMAGE_PATH,
      `${imageName}.${format}`,
    )
  }

  async composeImages(
    image1: Express.Multer.File,
    image2: Express.Multer.File,
  ) {
    /*this.logger.debug(
      `Llamando a composeImages con ${JSON.stringify(
        image1,
      )} y ${JSON.stringify(image2)}`,
    )*/
    const imageBuffer = await this.sharpService.composeImages(
      image1.buffer,
      image2.buffer,
    )
    const { format } = await this.sharpService.getMetadata(imageBuffer)
    return await this.sharpService.storeImage(
      imageBuffer,
      PROCESSED_IMAGE_PATH,
      `composed-${uuidv4()}.${format}`,
    )
  }
}
