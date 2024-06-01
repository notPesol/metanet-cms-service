import { BadRequestException, Injectable } from '@nestjs/common';
import { WalletRepository } from './repository';
import { WalletDTO, UpdateWalletDTO } from './dto/dto';
import { BaseService } from 'src/common/service/base.service';
import { Request } from 'express';
import { TransactionService } from 'src/transaction/service';
import { TransactionDTO } from 'src/transaction/dto/dto';
import { TransactionType } from 'src/transaction/enum';

@Injectable()
export class WalletService extends BaseService<WalletDTO> {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionService: TransactionService,
  ) {
    super(walletRepository);
  }
  private hasIncludeKey(key: TransactionType): boolean {
    return Object.values(TransactionType).includes(key);
  }

  async updateWalletBalance(
    req: Request,
    amount: number,
    transactionType: TransactionType,
  ): Promise<WalletDTO> {
    if (!this.hasIncludeKey(transactionType)) {
      throw new BadRequestException(`Invalid transaction type.`);
    }

    if (amount <= 0) {
      throw new BadRequestException(`Amount must be greater than 0.`);
    }

    const user = req['user'];
    console.log('user===', user);
    
    let wallet = await this.findOne({ where: { userId: user.id } });

    if (!wallet || !wallet.id) {
      throw new BadRequestException(`Wallet not found.`);
    }

    if (
      transactionType !== TransactionType.deposit &&
      +wallet.balance < amount
    ) {
      throw new BadRequestException(`There is not enough money in the wallet.`);
    }

    wallet.balance =
      transactionType === TransactionType.deposit
        ? +wallet.balance + amount
        : +wallet.balance - amount;
    wallet.updatedAt = new Date();

    wallet = await this.update(wallet.id, wallet);

    const transaction = new TransactionDTO(null);
    transaction.amount = amount;
    transaction.type = transactionType;
    transaction.userId = user.id;

    await this.transactionService.create(transaction);

    return wallet;
  }

  async me(req: Request) {
    const user = req['user'];
    return await this.findOne({ where: { userId: user.id } });
  }
}
