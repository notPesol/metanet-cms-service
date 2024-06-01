import { Module } from '@nestjs/common';
import { UserAssociationRepository } from './repository';
import { UserModule } from 'src/user/module';
import { WalletModule } from 'src/wallet/module';

@Module({
  imports: [UserModule, WalletModule],
  providers: [UserAssociationRepository],
  exports: [UserAssociationRepository],
})
export class UserAssociationModule {}
