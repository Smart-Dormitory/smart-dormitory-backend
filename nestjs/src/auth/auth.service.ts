import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../users/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: UserLoginDto) {
    const { studentId, password } = data;
    const user = await this.usersService.findUserByStudentId(studentId);
    if (!user) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 다시 확인해주세요.');
    }

    const payload = { studentId: user.studentId };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  // async logOut(token: string): Promise<void> {
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     this.jwtService.verify(token, process.env.JWT_SECRET || '');
  //   } catch (error) {
  //     throw new Error('유효하지 않은 토큰');
  //   }
  // }

  async jwtLogOut(token: string): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.jwtService.verify(token, process.env.JWT_TOKEN || '');
    } catch (error) {
      throw new Error('유효하지 않은 토큰');
    }
  }
}
