import {
  Controller,
  Get,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './service';
import { TransactionDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Request } from 'express';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { TransactionSearchDTO } from './dto/search.dto';

@Controller('/transaction')
export class TransactionController extends BaseController<TransactionDTO> {
  constructor(private readonly transactionetService: TransactionService) {
    super(transactionetService);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("/me")
  async me(@Query() query: TransactionSearchDTO, @Req() req: Request) {
    const result = await this.transactionetService.me(req, query);
    return result;
  }
}
