import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  // Nos creamos el repositorio de usuarios, que es el que se encarga de la lógica de negocio
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id })
  }
}
