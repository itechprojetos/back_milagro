import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../services';

import { JwtAuthGuard, LocalAuthGuard } from 'src/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
