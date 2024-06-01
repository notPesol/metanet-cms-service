import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorator/public';
import { AuthenticationDTO } from './dto/dto';
import { Request } from 'express';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Public()
  @Post('/register')
  async register(@Body(new ValidationPipe()) body: AuthenticationDTO) {
    const result = await this.authService.register(body);
    const responseDTO = new ResponseDTO();
    responseDTO.data = result;
    return responseDTO;
  }

  @Public()
  @Post('/login')
  async login(@Body(new ValidationPipe()) body: AuthenticationDTO) {
    const result = await this.authService.login(body);
    const responseDTO = new ResponseDTO();
    responseDTO.data = result;
    return responseDTO;
  }

  @Get('/profile')
  async profile(@Req() req: Request) {
    const result = await this.authService.profile(req);
    const responseDTO = new ResponseDTO();
    responseDTO.data = result;
    return responseDTO;
  }
}
