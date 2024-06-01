import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WalletService } from './service';
import { WalletDTO, UpdateWalletDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Request } from 'express';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { TransactionType } from 'src/transaction/enum';

@Controller('/wallet')
export class WalletController extends BaseController<WalletDTO> {
  constructor(private readonly walletService: WalletService) {
    super(walletService);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/me')
  async me(@Req() req: Request) {
    const result = await this.walletService.me(req);
    const responseDTO = new ResponseDTO<WalletDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async transaction(@Req() req: Request, @Body() body: UpdateWalletDTO) {
    const result = await this.walletService.updateWalletBalance(
      req,
      body.amount,
      body.transactionType,
    );
    const responseDTO = new ResponseDTO<WalletDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
