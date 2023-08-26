import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UserDto {
  // studentId
  @IsNotEmpty()
  @Matches(/^[0-9]{8}$/, { message: '학번은 숫자 8자리여야 합니다' })
  readonly studentId: string;

  // name
  @IsString()
  @Matches(/^[a-zA-Z가-힣\s]+$/, {
    message: '이름은 한글 또는 영문 알파벳만 입력 가능합니다.',
  })
  @MaxLength(20, { message: '이름은 최대 20글자까지 가능합니다.' })
  @IsNotEmpty()
  readonly name: string;

  // email
  @IsString()
  @IsEmail({}, { message: '유효한 이메일 주소 형식이어야 합니다.' })
  @MaxLength(50)
  @IsNotEmpty()
  readonly email: string;

  // password
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,14}$/,
    {
      message:
        '비밀번호는 영문자, 숫자, 특수문자(@$!%*#?&) 중 적어도 1개씩을 포함해야 합니다',
    },
  )
  readonly password: string;

  // room Number
  @IsString()
  @Matches(/^(인화동|성실동|미래동|목련화동|소나무동)$/, {
    message:
      '올바른 호실 정보를 입력하세요. (인화동, 성실동, 미래동, 목련화동, 소나무동)',
  })
  @MaxLength(6, { message: '호실 정보는 6글자까지 가능합니다.' })
  @IsNotEmpty()
  readonly livingRoom: string;
}
