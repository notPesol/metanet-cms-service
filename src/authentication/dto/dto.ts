import { IsNumber, IsString } from 'class-validator';

export class AuthenticationDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class CreateCartDTO {
  @IsNumber()
  userId: number;
}
