import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    // studentId
    @ApiProperty({
        example: "20191836",
        description: "studentId",
        required: true,
    })
    @IsNotEmpty()
    @Matches(/^[0-9]{8}$/, {message: "학번은 숫자 8자리여야 합니다"})
    readonly studentId: string;

    // name
    @ApiProperty({
        example: "김철수",
        description: "name",
        required: true,
    })
    @IsString()
    @Matches(/^[a-zA-Z가-힣\s]+$/, {
        message: "이름은 한글 또는 영문 알파벳만 입력 가능합니다.",
    })
    @MaxLength(20, {message: "이름은 최대 20글자까지 가능합니다."})
    @IsNotEmpty()
    readonly name: string;

    // email
    @ApiProperty({
        example: "1234@naver.com",
        description: "email",
        required: true,
    })
    @IsString()
    @IsEmail({}, {message: "유효한 이메일 주소 형식이어야 합니다."})
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;

    // password
    @ApiProperty({
        example: "abcd123456*",
        description: "password",
        required: true,
    })
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,14}$/,
        {
            message:
                "비밀번호는 10자리 이상 14자리 이하이며 영문자, 숫자, 특수문자(@$!%*#?&) 중 적어도 1개씩을 포함해야 합니다",
        },
    )
    readonly password: string;

    // roomName
    @ApiProperty({
        example: "인화동",
        description: "roomName",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(["인화동", "성실동", "미래동", "목련화동", "소나무동"], {
        message:
            "올바른 생활관을 입력하세요. (인화동, 성실동, 미래동, 목련화동, 소나무동)",
    })
    readonly roomName: string;

    // roomNumber
    @ApiProperty({
        example: "2002호",
        description: "roomNumber",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9]{1,4}호$/, {
        message: "호실 숫자는 최대 4글자까지 가능합니다. (예: \"2002호\")",
    })
    @MaxLength(5, {
        message: "호실 숫자는 최대 4글자까지 가능합니다. (예: \"2002호\")",
    })
    @IsNotEmpty()
    readonly roomNumber: string;
}
