import { Injectable, Logger } from '@nestjs/common'
import { SharpService } from '../sharp/sharp.service'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ProcessorService {
  private readonly logger = new Logger(ProcessorService.name)

  // Inyectamos el servicio SharpService
  constructor(private readonly sharpService: SharpService) {}

  async getMetadata(image: Express.Multer.File) {
    return await this.sharpService.getMetadata(image.path)
  }

  async getStats(image: Express.Multer.File) {
    return await this.sharpService.getStats(image.path)
  }

  async storeImage(image: Express.Multer.File) {
    return await this.sharpService.storeImage(
      image.buffer,
      './uploads',
      uuidv4() + extname(image.originalname),
    )
  }
}
