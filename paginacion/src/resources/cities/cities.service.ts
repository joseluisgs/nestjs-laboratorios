import { Injectable } from '@nestjs/common'
import { City } from './models/city.model'
import { InjectModel } from '@nestjs/sequelize'

export type Filter = 'ID' | 'Name' | 'countryCode' | 'District' | 'Population'
export type Sort = 'DESC' | 'ASC'

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  async findAll() {
    return await this.cityModel.findAll()
  }

  async findAllWithPagination(
    page: number,
    pageSize: number,
    filter: Filter,
    order: Sort,
  ) {
    const { rows, count } = await this.cityModel.findAndCountAll({
      limit: pageSize,
      offset: page > 0 ? (page - 1) * pageSize : 0,
      order: [[filter, order]], // Array de arrays
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
