import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserEntity } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service'
import { JwtModule } from '@nestjs/jwt'
import * as process from 'process'
import { RoleEntity } from './entities/role.entity'

@Module({
  imports: [
    // Importamos el modulo de TypeOrm para tener el Repositorio de UserEntity y RoleEntity
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
