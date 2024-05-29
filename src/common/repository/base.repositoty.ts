import { OnApplicationBootstrap } from '@nestjs/common';
import {
  CreateOptions,
  FindOptions,
  Model,
  ModelCtor,
  NonNullFindOptions,
} from 'sequelize';

export abstract class BaseRepoSitory implements OnApplicationBootstrap {
  protected model: ModelCtor<any>;

  protected init() {}

  getModel() {
    return this.model;
  }

  setSchema(schema: string) {
    this.model.schema(schema);
  }

  async findByPk(id: number): Promise<Model | null> {
    return this.model.findByPk(id);
  }

  async findOne(
    options: NonNullFindOptions | FindOptions,
  ): Promise<Model | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions): Promise<Model[]> {
    return this.model.findAll(options);
  }

  async findAndCountAll(
    options?: FindOptions,
  ): Promise<{ rows: Model[]; count: number }> {
    return this.model.findAndCountAll(options);
  }

  async create(data: any, options?: CreateOptions<any>): Promise<Model> {
    return this.model.create(data, { ...options, returning: true });
  }

  async update(id: number, data: any): Promise<Model | null> {
    await this.model.update(data, { where: { id } });
    return this.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.model.destroy({ where: { id } });
    return result === 1;
  }

  onApplicationBootstrap() {
    this.init();
  }
}
