import { CreateUserDto } from './create-user.dto';

// eslint-disable-next-line prettier/prettier
export class UpdateUserDto extends (CreateUserDto) {
  is_active?: true | false;
  old_password?: string;
}
