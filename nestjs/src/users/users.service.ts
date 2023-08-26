import {
  Body,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async signUp(@Body() body: CreateUserDto) {
    const { studentId, name, password, email, roomNumber, roomName } = body;

    // 학번 중복 학인
    const isStudentIdExist = await this.userModel.exists({ studentId });
    if (isStudentIdExist) {
      throw new UnauthorizedException('이미 가입된 학번입니다.');
    }

    // 이메일 중복 확인
    const isEmailExist = await this.userModel.exists({ email });
    if (isEmailExist) {
      throw new UnauthorizedException('이미 가입된 이메일입니다.');
    }

    const user = await this.userModel.create({
      studentId,
      name,
      email,
      password,
      roomName,
      roomNumber,
    });

    return user;
  }

  async logIn(studentId: string, password: string) {
    const user = await this.userModel.findOne({ studentId });

    if (!user) {
      throw new UnauthorizedException(
        '로그인 실패 : 학번이나 비밀번호가 일치하지 않습니다.',
      );
    }

    if (user.password !== password) {
      throw new UnauthorizedException(
        '로그인 실패 : 학번이나 비밀번호가 일치하지 않습니다.',
      );
    }
  }

  async findUserByStudentId(studentId: string): Promise<User | null> {
    return this.userModel.findOne({ studentId }).exec();
  }
}
