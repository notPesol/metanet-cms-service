import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  UserAssociationRepository,
  IncludeKey,
} from 'src/user-association/repository';
import { UserAssociationDTO } from 'src/user-association/dto/dto';
import { AuthenticationDTO } from './dto/dto';
import { UserDTO } from 'src/user/dto/dto';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userAssociationRepository: UserAssociationRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async findOne(username: string, includeKey: IncludeKey) {
    const model = await this.userAssociationRepository.findOne({
      include: this.userAssociationRepository.getIncludeOption(includeKey),
      where: {
        username,
      },
    });

    return new UserAssociationDTO(model);
  }

  private async createAccessToken(userAssociationDTO: UserAssociationDTO) {
    delete userAssociationDTO.passwordHash;

    const payload = {
      sub: userAssociationDTO.id,
      id: userAssociationDTO.id,
      username: userAssociationDTO.username,
      // wallets: userAssociationDTO.wallets,
      wallet: userAssociationDTO.wallet,
    };

    return await this.jwtService.signAsync(payload);
  }

  async login(body: AuthenticationDTO) {
    const userAssociationDTO = await this.findOne(
      body.username,
      IncludeKey.userWallet,
    );

    if (!userAssociationDTO?.id) {
      throw new UnauthorizedException();
    }

    const isTrue = await bcrypt.compare(
      body.password,
      userAssociationDTO.passwordHash,
    );

    if (!isTrue) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(userAssociationDTO);
    return { accessToken };
  }

  async register(body: AuthenticationDTO) {
    const model = await this.userAssociationRepository.findOne({
      where: { username: body.username },
    });

    if (model) {
      throw new BadRequestException('Username is already exist.');
    }

    const password = body.password;
    body.password = await bcrypt.hash(password, 10);

    const sqTransaction = await this.userAssociationRepository
      .getModel()
      .sequelize.transaction();
    const createOptions = { returning: true, transaction: sqTransaction };
    try {
      const newUserModel = await this.userAssociationRepository.create(
        { ...body, passwordHash: body.password },
        createOptions,
      );
      const userDTO = new UserDTO(newUserModel);

      await this.userAssociationRepository
        .getWalletRepository()
        .create({ userId: userDTO.id, balance: 0 }, createOptions);

      await sqTransaction.commit();

      const userAssociationDTO = await this.findOne(
        body.username,
        IncludeKey.userWallet,
      );

      const accessToken = await this.createAccessToken(userAssociationDTO);

      return { accessToken };
    } catch (error) {
      await sqTransaction.rollback();
      throw new InternalServerErrorException();
    }
  }

  async profile(req: Request) {
    const user = req['user'];

    const userAssociationDTO = await this.findOne(
      user.username,
      IncludeKey.userWallet,
    );

    delete userAssociationDTO.passwordHash;

    return userAssociationDTO;
  }
}
