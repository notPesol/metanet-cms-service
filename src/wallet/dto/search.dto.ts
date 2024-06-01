import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { SearchDTO } from "src/common/dto/search.dto";

export class WalletSearchDTO extends SearchDTO {
  @IsNumber()
  @IsOptional()
  @Transform((params) => parseInt(params.value))
  userId: number = 0;
}