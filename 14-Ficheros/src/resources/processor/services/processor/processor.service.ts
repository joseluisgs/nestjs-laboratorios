import { Injectable, Logger } from '@nestjs/common'
import { SharpService } from '../sharp/sharp.service'

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
}
