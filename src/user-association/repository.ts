import { Injectable } from '@nestjs/common';
import { BaseAssociationRepository } from 'src/common/repository/base-association.repository';

import { UserRepository } from 'src/user/repository';
import { WalletRepository } from 'src/wallet/repository';

export enum IncludeKey {
  userWallet = 'user-wallet',
  userWalletTransaction = 'user-wallet-transaction',
}

@Injectable()
export class UserAssociationRepository extends BaseAssociationRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRoleRepository: WalletRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.userRepository.getModel();
  }

  protected setupAssociation(): void {
    const UserModel = this.userRepository.getModel();
    const WalletModel = this.walletRoleRepository.getModel();

    // UserModel.hasMany(WalletModel, {
    //   foreignKey: 'userId',
    // });
    UserModel.hasOne(WalletModel, {
      foreignKey: 'userId',
    });
  }

  protected setupIncludeOptions(): void {
    this.includeOptions.set(IncludeKey.userWallet, [
      {
        model: this.walletRoleRepository.getModel(),
      },
    ]);
  }

  getIncludeOption(key: string) {
    return this.includeOptions.get(key);
  }

  // util method
  getUserRepository() {
    return this.userRepository;
  }

  getWalletRepository() {
    return this.walletRoleRepository;
  }
}
