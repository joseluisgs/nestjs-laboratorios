import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthCheckService {
  getHealthCheck() {
    return {
      uptime: process.uptime(),
      message: 'OK',
      api_status: 'I am alive! :) 👍',
      timestamp: Date.now(),
    }
  }
}
