import { IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class UserDTO extends BaseDTO {
  @IsString()
  username: string;

  @IsString()
  passwordHash: string;
}
