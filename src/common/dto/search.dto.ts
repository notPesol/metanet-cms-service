import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsString()
  @IsOptional()
  query: string;

  @IsNumber()
  @IsOptional()
  @Transform((params) => parseInt(params.value))
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform((params) => parseInt(params.value))
  limit: number = 10;

  @IsBoolean()
  @IsOptional()
  @Transform((params) => params.value === 'true')
  ignorePage: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform((params) => params.value === 'true')
  count: boolean;
}
