import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller('health-check')
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  check() {
    return {
      status: '👍 I am alive!',
      moment: new Date().toISOString(),
    }
  }
}
