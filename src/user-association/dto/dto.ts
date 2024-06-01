import { UserDTO } from 'src/user/dto/dto';
import { WalletDTO } from 'src/wallet/dto/dto';

export class UserAssociationDTO extends UserDTO {
  // wallets: WalletDTO[];
  wallet: WalletDTO;
}
