import { RoleEntity } from '../entities/role.entity'
import { Repository } from 'typeorm/repository/Repository'
import { InternalServerErrorException, Logger } from '@nestjs/common'

export class RoleRepository extends Repository<RoleEntity> {
  private logger = new Logger(RoleRepository.name)

  async findDefaultRole() {
    const defaultRole = 'USER'
    try {
      return await this.findBy({ name: defaultRole })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al buscar el rol por defecto',
      )
    }
  }
}
