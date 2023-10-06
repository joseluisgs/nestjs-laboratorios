import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'
import { extname } from 'path'
import * as fs from 'fs'

import { Response } from 'express'

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name)

  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(`Subiendo archivo:  ${file.originalname}`)
    console.log(file)
    return {
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }
  }

  @Post('store-file')
  @UseInterceptors(
    FileInterceptor('file', {
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
  storeFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(`Subiendo archivo:  ${file}`)
    console.log(file)
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      destination: file.destination,
      path: file.path,
    }
  }

  @Post('store-files')
  @UseInterceptors(
    // 'files' es el nombre del campo en el formulario
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
      ],
      {
        // Actúa por cada fichero subido
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const fileName = uuidv4() // usamos uuid para generar un nombre único para el archivo
            const fileExt = extname(file.originalname) // extraemos la extensión del archivo
            cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
          },
        }),
      },
    ),
  ) // 'file' es el nombre del campo en el formulario
  storeFiles(
    @UploadedFiles()
    files: {
      file1: Express.Multer.File[]
      file2: Express.Multer.File[]
    },
  ) {
    this.logger.log(`Subiendo archivos:  ${files.file1}`)
    this.logger.log(`Subiendo archivos:  ${files.file2}`)
    console.log(files)
    return {
      file1: {
        originalname: files.file1[0].originalname,
        filename: files.file1[0].filename,
        size: files.file1[0].size,
        mimetype: files.file1[0].mimetype,
        destination: files.file1[0].destination,
      },
      file2: {
        originalname: files.file2[0].originalname,
        filename: files.file2[0].filename,
        size: files.file2[0].size,
        mimetype: files.file2[0].mimetype,
        destination: files.file2[0].destination,
      },
    }
  }

  @Post('process-file')
  @UseInterceptors(
    FileInterceptor('file', {
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
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { body: any },
  ) {
    this.logger.log(`Subiendo archivo:  ${file}`)
    this.logger.log(`Body:  ${JSON.stringify(body.body)}`)
    console.log(file)
    console.log(body)

    const parsedBody = JSON.parse(body.body) // convertimos body a un objeto JSON
    const name = parsedBody.properties.name // accedemos a la propiedad name

    return {
      name: name,
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      destination: file.destination,
      path: file.path,
    }
  }

  // Descarga de archivos
  @Get('download-file/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.resolve('./uploads', filename)

    // Verifica si el archivo existe
    if (fs.existsSync(filePath)) {
      // Si el archivo existe, lo establece como la respuesta
      res.download(filePath)
    } else {
      // Si el archivo no existe, envía un error 404
      res.status(404).send('Fichero no encontrado :(')
    }
  }
}
