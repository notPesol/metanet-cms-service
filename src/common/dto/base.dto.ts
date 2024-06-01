import { IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Model } from 'sequelize';

export class BaseDTO {
  @IsNumber()
  id: number;

  @IsBoolean()
  isDeleted: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(data: any) {
    if (data) {
      if (data instanceof Model) {
        Object.assign(this, data.toJSON());
      } else {
        Object.assign(this, data);
      }
    }
  }
}
