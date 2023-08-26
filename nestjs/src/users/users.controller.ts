import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto): Promise<string> {
    console.log(body);
    await this.usersService.signUp(body);
    return '가입을 환영합니다.';
  }

  @Post('/login')
  async logIn(
    @Body() loginDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.logIn(
      loginDto.studentId,
      loginDto.password,
    );
    return { accessToken };
  }

  // @Post('/logout')
  // // async logOut(@Body() token: string): Promise<string> {
  //   return '로그아웃 되었습니다.';
  // }
}
