import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Dialect,
  Model,
  ModelAttributes,
  ModelCtor,
  ModelOptions,
  Sequelize,
} from 'sequelize';

interface IDatabase {
  host: string;
  port: number;
  username: string;
  password: string;
  dialect: Dialect;
  database: string;
}

@Injectable()
export class SequelizeService implements OnModuleInit {
  private dbConfig: IDatabase;
  private sequelize: Sequelize;

  constructor(private readonly configService: ConfigService) {
    this.dbConfig = this.configService.get<IDatabase>('database');

    this.sequelize = new Sequelize({
      host: this.dbConfig.host,
      dialect: this.dbConfig.dialect,
      username: this.dbConfig.username,
      // password: this.dbConfig.password,
      port: this.dbConfig.port,
      database: this.dbConfig.database,
      
    });
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }

  defineModel(
    modelName: string,
    attributes: ModelAttributes,
    options?: ModelOptions,
  ): ModelCtor<Model<any>> {
    const model = this.sequelize.define(modelName, attributes, {
      ...options,
      underscored: true,
    });
    return model;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async onModuleInit() {
    await this.testConnection();
  }
}
