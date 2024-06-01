import { Module } from '@nestjs/common';
import { TransactionService } from './service';
import { TransactionController } from './controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from 'src/common/sequelize/module';
import { TransactionRepository } from './repository';

@Module({
  imports: [ConfigModule, SequelizeModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
