import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UserRepository } from './repository';

@Module({
  imports: [ConfigModule, SequelizeModule],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
