import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['인화동', '성실동', '미래동', '목련화동', '소나무동'])
  roomName: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  roomNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
