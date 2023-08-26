import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async logIn(
    studentId: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUserByStudentId(studentId);

    if (!user || user.password !== password) {
      throw new UnauthorizedException(
        '로그인 실패 : 학번이나 비밀번호가 일치하지 않습니다.',
      );
    }

    const payload = { sub: user.studentId }; // 유저 아이디를 토큰 페이로드에 추가
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
