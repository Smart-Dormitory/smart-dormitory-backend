import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() body: UserDto): Promise<string> {
    console.log(body);
    await this.usersService.signUp(body);
    return '가입을 환영합니다.';
  }
}
