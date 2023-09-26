import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { BasicStrategy } from 'passport-http'

/**
 * Clase que implementa la estrategia de autenticación básica de Passport
 */
@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor() {
    // Le decimos que los datos de la petición que vienen del Header se los pase al callback
    super({ passReqToCallback: true })
  }

  /**
   * Método que valida las credenciales de la petición cuando es de tipo Basic Auth
   * @param req
   * @param username
   * @param password
   */
  public validate = async (
    req: Request,
    username: string,
    password: string,
  ) => {
    // Las credenciales vienen en el header de la petición y las comparamos con las que tenemos en el .env
    if (
      process.env.API_USER === username &&
      process.env.API_PASS === password
    ) {
      return true
    }
    throw new UnauthorizedException('Credenciales invalidas')
  }
}