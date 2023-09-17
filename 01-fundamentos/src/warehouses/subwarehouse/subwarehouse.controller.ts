import { Controller, Get } from '@nestjs/common'

@Controller('subwarehouse')
export class SubwarehouseController {
  @Get()
  getSubwarehouse() {
    return 'Subwarehouse'
  }
}
