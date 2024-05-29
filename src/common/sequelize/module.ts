import { Module } from '@nestjs/common';
import { SequelizeService } from './service';

@Module({
  providers: [SequelizeService],
  exports: [SequelizeService],
})
export class SequelizeModule {}
