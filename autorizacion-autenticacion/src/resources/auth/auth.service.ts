import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm/repository/Repository'
import { InjectRepository } from '@nestjs/typeorm'
import { UserSignInDto } from './dto/user-sign.in.dto'
import { UserSignUpDto } from './dto/user-sign.up.dto'
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)

  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(userSignInDto: UserSignInDto) {
    const userFound = await this.findByEmail(userSignInDto.email)
    if (!userFound) {
      throw new NotFoundException('No existe un usuario con ese email')
    }
    let passwordMatch = false
    try {
      passwordMatch = await this.bcryptService.isMatch(
        userSignInDto.password,
        userFound.password,
      )
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al comprobar password')
    }
    if (!passwordMatch) {
      throw new BadRequestException('Contraseña incorrecta')
    }
    // Poedemos devolver el usuario completo o parte de el
    // return userFound
    return this.getAccessToken(userFound)
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
      const userCreated = await this.authRepository.save({
        ...userSignUpDto,
        password: passwordHash,
      })
      return this.getAccessToken(userCreated)
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

  private getAccessToken(user: UserEntity) {
    try {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      }
      const access_token = this.jwtService.sign(payload)
      return {
        access_token,
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al generar el token')
    }
  }
}
