import { Injectable } from '@nestjs/common'
import { City } from './models/city.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  async findAll() {
    return await this.cityModel.findAll()
  }

  async findAllWithPagination(page: number, pageSize: number) {
    const { rows, count } = await this.cityModel.findAndCountAll({
      limit: pageSize,
      offset: page > 0 ? (page - 1) * pageSize : 0,
    })
    return {
      total_cities: count,
      total_pages: Math.ceil(count / pageSize),
      page_size: pageSize,
      page_number: page,
      cities: rows,
    }
  }
}
