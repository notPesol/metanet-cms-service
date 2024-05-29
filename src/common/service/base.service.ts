import { FindOptions, Model, NonNullFindOptions } from 'sequelize';
import { BaseRepoSitory } from '../repository/base.repositoty';
import { SearchDTO } from '../dto/search.dto';
import { ResponseDTO } from '../dto/response.dto';

export class BaseService<T> {
  protected readonly repository: BaseRepoSitory;

  constructor(repository: BaseRepoSitory) {
    this.repository = repository;
  }

  toJson(data: any): T {
    if (data instanceof Model) {
      return data.toJSON();
    }
    return Object.assign({}, data);
  }

  async findByPk(id: number): Promise<T> {
    const model = await this.repository.findByPk(id);
    return await this.toJson(model);
  }

  async findOne(options: NonNullFindOptions | FindOptions): Promise<T> {
    const model = await this.repository.findOne(options);
    return this.toJson(model);
  }

  async findAll(searchDTO: SearchDTO): Promise<ResponseDTO<T[]>> {
    const options = {};

    if (!searchDTO.ignorePage) {
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
      options['limit'] = searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<T[]>();

    if (searchDTO.count) {
      const { rows, count } = await this.findAndCountAll(options);
      responseDTO.totalItem = count;
      responseDTO.data = rows.map((model) => this.toJson(model));
    } else {
      const rows = await this.getAll(options);
      responseDTO.data = rows;
    }

    return responseDTO;
  }

  async getAll(options?: FindOptions): Promise<T[]> {
    const rows = await this.repository.findAll(options);
    return rows.map((model) => this.toJson(model));
  }

  async findAndCountAll(
    options?: FindOptions,
  ): Promise<{ rows: T[]; count: number }> {
    const { rows, count } = await this.repository.findAndCountAll(options);
    return { rows: rows.map((model) => this.toJson(model)), count };
  }

  async create(data: any): Promise<T> {
    const model = await this.repository.create(data);
    return this.toJson(model);
  }

  async update(id: number, data: any): Promise<T> {
    const model = await this.repository.update(id, data);
    return this.toJson(model);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
