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
import * as bcrypt from 'bcrypt';
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      studentId,
      name,
      email,
      password: hashedPassword,
      roomName,
      roomNumber,
    });

    return user;
  }

  async findUserByStudentId(studentId: string): Promise<User | null> {
    return this.userModel.findOne({ studentId }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updatePassword(studentId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await this.userModel.findOneAndUpdate(
      { studentId },
      { password: hashedPassword },
      { new: true },
    );

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async setTemporaryPasswordStatus(
    studentId: string,
    isTemporary: boolean,
  ): Promise<void> {
    const user = await this.userModel.findOneAndUpdate(
      { studentId },
      { isTemporaryPassword: isTemporary },
      { new: true },
    );

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
  }
}
