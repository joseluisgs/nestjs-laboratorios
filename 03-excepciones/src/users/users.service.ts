import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    throw new HttpException(
      { error: 'metodo no implementado', status: HttpStatus.NOT_IMPLEMENTED },
      HttpStatus.NOT_IMPLEMENTED,
    )
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    if (id === 1) {
      return `This action returns a #${id} user`
    }
    // throw new NotFoundException(`User #${id} not found`)
    throw new HttpException(`User #${id} not found`, HttpStatus.NOT_FOUND)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    if (id === 1) {
      return `This action removes a #${id} user`
    }
    throw new NotFoundException(`User #${id} not found`)
  }
}
