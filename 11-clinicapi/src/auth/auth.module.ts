import { Module } from '@nestjs/common'
import { BasicAuthStrategy } from './basic-auth.strategy'
import { PassportModule } from '@nestjs/passport'

/**
 * Módulo de autenticación
 */
@Module({
  // Para que funcione necesitamos el módulo de Passport
  imports: [PassportModule],
  // Los proveedores de autenticación
  providers: [BasicAuthStrategy],
})
export class AuthModule {
}
