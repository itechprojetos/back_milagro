import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto';
import { UsersService } from 'src/modules/users/services';

@Controller()
export class SignupController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('activate/:token')
  activate(@Param('token') token: string) {
    return this.usersService.activate(token);
  }
}
