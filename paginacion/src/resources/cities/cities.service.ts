import { Injectable } from '@nestjs/common'
import { City } from './models/city.model'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

export type Filter = 'ID' | 'Name' | 'countryCode' | 'District' | 'Population'
export type Sort = 'DESC' | 'ASC'

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  async findAll() {
    return await this.cityModel.findAll()
  }

  async findAllWithPagination(
    page?: number,
    pageSize?: number,
    filter?: Filter,
    order?: Sort,
    serach?: string,
  ) {
    const { rows, count } = await this.cityModel.findAndCountAll({
      // Where es un objeto que se le pasa al método findAndCountAll
      // Podemos filtrar por subcadenas con Op.substring, o por igualdad con Op.eq
      // o like con Op.like (que es case insensitive)
      // un ejmeplo con like sería:
      // name: {
      //   [Op.like]: `%${serach}%`,
      // },
      where: {
        name: {
          [Op.substring]: serach,
        },
      },
      // Resto de opciones
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
