import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './repository';
import { TransactionDTO } from './dto/dto';
import { TransactionSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Request } from 'express';
import { SearchDTO } from 'src/common/dto/search.dto';

@Injectable()
export class TransactionService extends BaseService<TransactionDTO> {
  constructor(private readonly transactionRepository: TransactionRepository) {
    super(transactionRepository);
  }

  async findAll(
    searchDTO: TransactionSearchDTO,
  ): Promise<ResponseDTO<TransactionDTO[]>> {
    const where = {};
    const options = {};

    if (searchDTO.userId) {
      where['userId'] = searchDTO.userId;
    }
    if (searchDTO.type) {
      where['type'] = searchDTO.type;
    }

    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    if (searchDTO.orderBy) {
      options['order'] = [[searchDTO.orderBy, searchDTO.orderType]]
    }

    const responseDTO = new ResponseDTO<TransactionDTO[]>();

    const findOptions = {
      where,
      attributes: { exclude: ['password'] },
      ...options,
    };

    if (searchDTO.count) {
      const { rows, count } = await this.findAndCountAll(findOptions);
      responseDTO.data = rows;
      responseDTO.totalItem = count;
    } else {
      const rows = await this.getAll(findOptions);
      responseDTO.data = rows;
    }

    return responseDTO;
  }

  async me(req: Request, searchDTO: TransactionSearchDTO) {
    const user = req['user'];
    searchDTO.userId = user.id;
    return this.findAll(searchDTO);
  }
}
