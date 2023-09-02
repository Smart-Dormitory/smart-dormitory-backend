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

  @Post('logout')
  async logOut(@Body() payload: { accessToken: string }) {
    const token = payload.accessToken; // accessToken 필드에서 토큰 추출

    try {
      await this.authService.logOut(token);

      return { message: '로그아웃 성공' };
    } catch (error) {
      return { message: '로그아웃 실패', error: error.message };
    }
  }
}
