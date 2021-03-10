import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDto } from '../dto';
import { PasswordService } from '../services/password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  async forgot(@Body('email') email: string) {
    return await this.passwordService.forgot(email);
  }

  @Post('reset')
  async reset(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.passwordService.reset(resetPasswordDto);
  }
}
