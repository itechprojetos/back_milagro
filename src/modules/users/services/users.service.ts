import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MailerService } from '@nestjs-modules/mailer';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dto/';

import { User, Token } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,

    private readonly mailerServide: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name } = createUserDto;

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    const token = this.tokenRepository.create();
    token.user = user;
    await this.tokenRepository.save(token);

    await this.mailerServide.sendMail({
      to: email,
      from: 'no-replay@milagro.cc',
      subject: 'Milagro - Activate your account',
      template: 'welcome',
      context: {
        name,
        link: `https://app.milagro.cc/activate`,
        token: token.token,
      },
    });

    return user;
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findOne(req): Promise<any | undefined> {
    return await this.userRepository.findOne({
      where: { id: req.user.id },
      relations: ['companies'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);
    const { name, email, password, old_password, is_active } = updateUserDto;

    user.name = name;
    user.email = email;
    user.is_active = is_active;

    if (password && old_password) {
      const checkPassword = await bcrypt.compare(old_password, user.password);

      if (!checkPassword) {
        throw new UnauthorizedException('Old password does not match');
      }

      user.password = await bcrypt.hash(password, 10);
    }

    return user;
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne({ email });
  }

  async activate(token: string): Promise<any> {
    const checkToken = await this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!checkToken) {
      throw new UnauthorizedException('Token does not exists.');
    }

    checkToken.user.is_active = true;

    await this.tokenRepository.save(checkToken);
    await this.tokenRepository.delete({ token });

    return checkToken;
  }
}
