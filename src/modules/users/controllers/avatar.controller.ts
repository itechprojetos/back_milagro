import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from 'src/modules/uploads/services';

import { JwtAuthGuard } from 'src/shared';

@Controller('users')
export class AvatarController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    return this.uploadsService.upload({
      dataBuffer: file.buffer,
      filename: file.originalname,
      mineType: file.mimetype,
      path: 'users',
    });
  }
}

// Não esquecer de passar qual o usuário e salvar no banco.
