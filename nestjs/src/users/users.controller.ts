import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
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
  ): Promise<{ accessToken: string; message: string }> {
    // 사용자가 입력한 패스워드를 가져옴
    const { studentId, password } = loginDto;

    // 임시 비밀번호 형식 확인
    if (password.startsWith('@Temp@')) {
      // 임시 비밀번호로 로그인한 경우, 일시적으로 변경 비밀번호로 로그인

      // 사용자를 일시적으로 변경 비밀번호로 로그인
      const { accessToken } = await this.authService.logIn(studentId, password);

      await this.usersService.setTemporaryPasswordStatus(studentId, true);

      return {
        accessToken,
        message: '임시 비밀번호로 로그인하셨습니다. 비밀번호를 변경하세요.',
      };
    } else {
      // 일반 비밀번호로 로그인한 경우
      const { accessToken } = await this.authService.logIn(studentId, password);

      return {
        accessToken,
        message: '로그인 되었습니다.',
      };
    }
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

  @Post('/help/pwd')
  async resetPassword(@Body() { email }: { email: string }): Promise<string> {
    //이메일 주소에 대한 사용자 존재 여부 확인
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    // 임시 비밀번호 생성
    const temporaryPassword = `@Temp@${Math.random().toString(36).slice(-8)}`;

    // 새로운 임시 비밀번호를 사용자의 비밀번호로 업데이트
    await this.usersService.updatePassword(user.studentId, temporaryPassword);

    // 임시 비밀번호를 사용자 이메일로 보냄
    await this.emailService.sendPasswordResetEmail(email, temporaryPassword);

    return '임시 비밀번호가 이메일로 전송되었습니다.';
  }
}
