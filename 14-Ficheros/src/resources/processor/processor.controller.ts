import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ProcessorService } from './services/processor/processor.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'

@Controller('processor')
export class ProcessorController {
  private readonly logger = new Logger(ProcessorController.name)

  constructor(private readonly processorService: ProcessorService) {}

  @Post('process-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
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
    @Body() body: { properties: any },
  ) {
    this.logger.log(`Subiendo archivo:  ${image}`)
    this.logger.log(`Body:  ${JSON.stringify(body.properties)}`)
    console.log(image)
    console.log(body)

    const parsedProperties = JSON.parse(body.properties) // convertimos body a un objeto JSON
    console.log(parsedProperties)

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
        destination: './uploads',
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
    @Body() body: { properties: any },
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
        destination: './uploads',
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
    @Body() body: { properties: any },
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
}
