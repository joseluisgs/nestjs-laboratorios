import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Importamos el módulo de TypeORM y le pasamos la entidad a usar
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
