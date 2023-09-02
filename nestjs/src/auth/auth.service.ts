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
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  // TODO : 로그아웃 처리 추가 로직 작성 필요
  async logOut(token: string): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.jwtService.verify(token, process.env.JWT_SECRET || '');
    } catch (error) {
      throw new Error('유효하지 않은 토큰');
    }
  }
}
