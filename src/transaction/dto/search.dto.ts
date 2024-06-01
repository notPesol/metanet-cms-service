import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SearchDTO } from "src/common/dto/search.dto";
import { TransactionType } from "../enum";

export class  TransactionSearchDTO extends SearchDTO {
  @IsNumber()
  @IsOptional()
  @Transform((params) => parseInt(params.value))
  userId: number = 0;

  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType = null;
}