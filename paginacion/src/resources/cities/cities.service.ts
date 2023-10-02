import { Injectable } from '@nestjs/common'
import { City } from './models/city.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  async findAll() {
    return await this.cityModel.findAll()
  }
}
