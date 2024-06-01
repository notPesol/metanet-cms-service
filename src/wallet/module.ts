import { Module } from '@nestjs/common';
import { WalletService } from './service';
import { WalletController } from './controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from 'src/common/sequelize/module';
import { WalletRepository } from './repository';
import { TransactionModule } from 'src/transaction/module';

@Module({
  imports: [ConfigModule, SequelizeModule, TransactionModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  exports: [WalletService, WalletRepository],
})
export class WalletModule {}
