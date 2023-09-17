import { Controller, Get } from '@nestjs/common'

@Controller('warehouses')
export class WarehousesController {
  @Get()
  getWarehouses() {
    return 'Get Warehouses'
  }
}
