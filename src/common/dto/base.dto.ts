import { Model } from 'sequelize';

export class BaseDTO {
  constructor(data: any) {
    if (data instanceof Model) {
      Object.assign(this, data.toJSON());
    } else {
      Object.assign(this, data);
    }
  }
}
