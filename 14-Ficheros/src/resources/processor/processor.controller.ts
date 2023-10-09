import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ProcessorService } from './services/processor/processor.service'
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import { UPLOADS_IMAGE_PATH } from '../constant/path.constants'

@Controller('processor')
export class ProcessorController {
  private readonly logger = new Logger(ProcessorController.name)

  constructor(private readonly processorService: ProcessorService) {}

  @Post('process-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: UPLOADS_IMAGE_PATH,
        filename: (req, file, cb) => {
          const fileName = uuidv4() // usamos uuid para generar un nombre único para el archivo
          const fileExt = extname(file.originalname) // extraemos la extensión del archivo
          cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
        },
      }),
    }),
  ) // 'file' es el nombre del campo en el formulario
  processFile(
    @UploadedFile() image: Express.Multer.File,
    // @Body() body: { properties: any },
  ) {
    this.logger.log(`Subiendo archivo:  ${image}`)
    // this.logger.log(`Body:  ${JSON.stringify(body.properties)}`)
    console.log(image)
    //console.log(body)

    //const parsedProperties = JSON.parse(body.properties) // convertimos body a un objeto JSON
    //console.log(parsedProperties)

    return {
      originalname: image.originalname,
      filename: image.filename,
      size: image.size,
      mimetype: image.mimetype,
      destination: image.destination,
      path: image.path,
    }
  }

  @Post('metadata')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: UPLOADS_IMAGE_PATH,
        filename: (req, file, cb) => {
          const fileName = uuidv4() // usamos uuid para generar un nombre único para el archivo
          const fileExt = extname(file.originalname) // extraemos la extensión del archivo
          cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
        },
      }),
    }),
  ) // 'file' es el nombre del campo en el formulario
  async getMetadataFile(
    @UploadedFile() image: Express.Multer.File,
    // @Body() body: { properties: any },
  ) {
    this.logger.log(`Subiendo archivo:  ${JSON.stringify(image)}`)
    // this.logger.log(`Body:  ${JSON.stringify(body.properties)}`)

    // const parsedProperties = JSON.parse(body.properties) // convertimos body a un objeto JSON
    // console.log(parsedProperties)

    return {
      originalname: image.originalname,
      filename: image.filename,
      size: image.size,
      mimetype: image.mimetype,
      destination: image.destination,
      path: image.path,
      metadata: await this.processorService.getMetadata(image),
    }
  }

  @Post('stats')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: UPLOADS_IMAGE_PATH,
        filename: (req, file, cb) => {
          const fileName = uuidv4() // usamos uuid para generar un nombre único para el archivo
          const fileExt = extname(file.originalname) // extraemos la extensión del archivo
          cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
        },
      }),
    }),
  ) // 'file' es el nombre del campo en el formulario
  async getStatsFile(
    @UploadedFile() image: Express.Multer.File,
    //@Body() body: { properties: any },
  ) {
    this.logger.log(`Subiendo archivo:  ${JSON.stringify(image)}`)
    // this.logger.log(`Body:  ${JSON.stringify(body.properties)}`)

    // const parsedProperties = JSON.parse(body.properties) // convertimos body a un objeto JSON
    // console.log(parsedProperties)

    return {
      originalname: image.originalname,
      filename: image.filename,
      size: image.size,
      mimetype: image.mimetype,
      destination: image.destination,
      path: image.path,
      stats: await this.processorService.getStats(image),
    }
  }

  @Post('store')
  @UseInterceptors(FileInterceptor('image')) // 'file' es el nombre del campo en el formulario
  async storeImage(@UploadedFile() image: Express.Multer.File) {
    // this.logger.log(`Subiendo archivo:  ${JSON.stringify(image)}`)
    // Salvar imagen con sharo
    const res = await this.processorService.storeImage(image)
    return {
      originalname: image.originalname,
      filename: image.filename,
      size: image.size,
      mimetype: image.mimetype,
      destination: image.destination,
      info: res,
    }
  }

  @Post('process')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: UPLOADS_IMAGE_PATH,
        filename: (req, file, cb) => {
          const fileName = uuidv4() // usamos uuid para generar un nombre único para el archivo
          const fileExt = extname(file.originalname) // extraemos la extensión del archivo
          cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
        },
      }),
    }),
  ) // 'file' es el nombre del campo en el formulario
  async processImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: { properties: any }, // Cuidado con el tipo de body, es ANY!!
  ) {
    // Obtenemos las propiedades de la imagen
    const imageProperties = JSON.parse(body.properties)
    this.logger.log(`Subiendo archivo:  ${image}`)
    this.logger.log(`Body:  ${imageProperties}`)
    try {
      const res = await this.processorService.processImage(
        image,
        imageProperties,
      )
      return {
        image: image.filename,
        ...res,
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }

  @Post('compose')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ]),
  ) // 'file' es el nombre del campo en el formulario
  async composeImage(
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File
      image2?: Express.Multer.File
    },
  ) {
    // this.logger.log(`Subiendo archivo:  ${JSON.stringify(files)}`)
    const { image1, image2 } = files
    try {
      const res = await this.processorService.composeImages(
        image1[0],
        image2[0],
      )
      return {
        image1: image1.filename,
        image2: image2.filename,
        ...res,
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    }
  }
}
