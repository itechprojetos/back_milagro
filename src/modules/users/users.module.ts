import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService, PasswordService, UsersService } from './services';
import { UploadsService } from '../uploads/services';

import {
  AuthController,
  SignupController,
  PasswordController,
  UsersController,
  AvatarController,
} from './controllers';

import { User, Token } from './entities';

import { LocalStrategy, JwtStrategy } from 'src/shared';

import { jwt } from 'src/config';
const { secret, signOptions } = jwt;

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    PassportModule,
    JwtModule.register({
      secret,
      signOptions,
    }),
  ],
  controllers: [
    UsersController,
    AuthController,
    PasswordController,
    SignupController,
    AvatarController,
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordService,
    UploadsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
