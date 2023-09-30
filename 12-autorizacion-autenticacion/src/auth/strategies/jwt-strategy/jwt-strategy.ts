import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../../../resources/auth/model/user.model'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // el token como barer token
      ignoreExpiration: false, // ignora la expiracion
      // La clave secreta
      secretOrKey: Buffer.from(
        process.env.TOKEN_SECRET ||
          'Me_Gustan_Los_Pepinos_De_Leganes_Porque_Son_Grandes_Y_Hermosos',
        'utf-8',
      ).toString('base64'),
    })
  }

  // Si se valida obtenemos el role
  async validate(payload: User) {
    // console.log(payload)
    return {
      id: payload.id,
      role: payload.role,
      username: payload.username,
    }
  }
}
