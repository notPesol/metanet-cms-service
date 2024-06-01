import { Module } from '@nestjs/common';
import { AuthenticationService } from './service';
import { AuthenticationController } from './controller';
import { UserAssociationModule } from 'src/user-association/module';

@Module({
  imports: [UserAssociationModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
