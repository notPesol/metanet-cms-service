import { IsEnum, IsNumber } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';
import { TransactionType } from '../enum';

export class TransactionDTO extends BaseDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
