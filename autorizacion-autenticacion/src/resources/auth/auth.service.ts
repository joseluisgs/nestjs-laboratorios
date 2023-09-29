import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotImplementedException,
} from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm/repository/Repository'
import { InjectRepository } from '@nestjs/typeorm'
import { UserSignInDto } from './dto/user-sign.in.dto'
import { UserSignUpDto } from './dto/user-sign.up.dto'
import * as bcrypt from 'bcrypt'
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  async singIn(userSignInDto: UserSignInDto) {
    throw new NotImplementedException('Not Implemented Yet!')
  }

  async singUp(userSignUpDto: UserSignUpDto) {
    // Si no llega un username metemos el mail.
    if (!userSignUpDto.username) {
      userSignUpDto.username = userSignUpDto.email
    }

    if (await this.findByUserName(userSignUpDto.username)) {
      throw new BadRequestException('Ya existe un usuario con ese username')
    }

    if (await this.findByEmail(userSignUpDto.email)) {
      throw new BadRequestException('Ya existe un usuario con ese email')
    }

    let passwordHash
    try {
      passwordHash = await this.bcryptService.hash(userSignUpDto.password)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error hashing password')
    }

    try {
      return await this.authRepository.save({
        ...userSignUpDto,
        password: passwordHash,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al guardar el usuario')
    }
  }

  async findByUserName(username: string) {
    try {
      return await this.authRepository.findOneBy({ username: username })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        `Error al buscar el usuario por nombre ${username}`,
      )
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.authRepository.findOneBy({ email: email })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        `Error al buscar el usuario por email ${email}`,
      )
    }
  }
}
