import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'

@ApiTags('users') // Añadimos el tag al controlador
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'usuario creado con exito.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 500, description: 'Internal server error.'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.name.length > 0 && createUserDto.surname.length > 0) {
      return this.usersService.create(createUserDto)
    }
    throw new NotAcceptableException('invalid user data')
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Usuario encontrado.',
    type: User
  })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
