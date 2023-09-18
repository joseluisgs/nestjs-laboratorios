import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

// Mock DB
let mockDB = [
  {
    id: 1,
    name: 'user 1',
    surname: 'surname 1',
  },
  {
    id: 2,
    name: 'user 2',
    surname: 'surname 2',
  },
  {
    id: 3,
    name: 'user 3',
    surname: 'surname 3',
  },
  {
    id: 4,
    name: 'user 4',
    surname: 'surname 4',
  },
]

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    mockDB.push(createUserDto)
    return this.findOne(createUserDto.id)
  }

  findAll() {
    return mockDB
  }

  findOne(id: number) {
    return mockDB.find((user) => user.id === id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = this.findOne(id) // find user
    const userUpdated = { ...userFound, ...updateUserDto } // fusion user with new data
    mockDB = mockDB.map((user) => (user.id === id && userUpdated) || user) // update user
    return userUpdated
  }

  remove(id: number) {
    mockDB = mockDB.filter((user) => user.id !== id)
  }
}
