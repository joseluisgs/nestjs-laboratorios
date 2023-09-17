import { Injectable, Logger } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    this.logger.log('estas acción ejecuta findAll')
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
