import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as process from 'process'
import { BasicStrategy as Strategy } from 'passport-http'

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ passReqToCallback: true })
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    if (
      username === process.env.API_USER &&
      password === process.env.API_PASS
    ) {
      return true
    }
    throw new UnauthorizedException('Credenciales invalidas')
  }
}
