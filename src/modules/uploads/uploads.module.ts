import { Module } from '@nestjs/common';
import { UploadsService } from './services';

@Module({
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
