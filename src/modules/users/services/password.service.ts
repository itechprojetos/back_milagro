import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { ResetPasswordDto } from '../dto';

import { Token } from '../entities';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private usersService: UsersService,
    private readonly mailerServide: MailerService,
  ) {}

  async forgot(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exists.');
    }

    const token = this.tokenRepository.create({ user_id: user.id });
    await this.tokenRepository.save(token);

    // Criar email para resetar senha
    await this.mailerServide.sendMail({
      to: email,
      from: 'no-replay@milagro.cc',
      subject: 'Milagro - reset your account',
      template: 'resetcount',
      context: {
        name: user.name,
        link: `https://app.milagro.cc/reset`,
        token: token.token,
      },
    });
  }

  async reset(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, password } = resetPasswordDto;

    const checkToken = await this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!checkToken) {
      throw new UnauthorizedException('Token does not exists.');
    }

    checkToken.user.password = await bcrypt.hash(password, 10);

    await this.tokenRepository.save(checkToken);
    await this.tokenRepository.delete({ token });
  }
}
