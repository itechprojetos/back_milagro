import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exists.');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (email && comparePassword) {
      const { password, ...result } = user;
      return result;
    }

    return;
  }

  async login(user: any) {
    const { id, email, name } = user;
    const playload = { email, sub: id };
    return {
      user: { id, email, name },
      token: this.jwtService.sign(playload),
    };
  }
}
