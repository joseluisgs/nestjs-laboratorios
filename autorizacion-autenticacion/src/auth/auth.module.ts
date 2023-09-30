import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import * as process from 'process'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthStrategy } from './strategies/jwt-strategy/jwt-strategy'

/*
Modulo de autenticacion
Necesita JWT
Passport
 */
@Module({
  imports: [
    JwtModule.register({
      // Lo voy a poner en base64
      secret: Buffer.from(
        process.env.TOKEN_SECRET ||
          'Me_Gustan_Los_Pepinos_De_Leganes_Porque_Son_Grandes_Y_Hermosos',
        'utf-8',
      ).toString('base64'),
      signOptions: {
        expiresIn: Number(process.env.TOKEN_EXPIRES) || 3600, // Tiempo de expiracion
        algorithm: 'HS512', // Algoritmo de encriptacion
      },
    }),
    PassportModule,
  ],
  exports: [JwtModule],
  providers: [JwtAuthStrategy],
})
export class AuthModule {}
