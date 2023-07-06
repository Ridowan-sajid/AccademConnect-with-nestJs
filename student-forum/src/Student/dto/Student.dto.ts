import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MinLength,
  minLength,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @Matches(/^[A-Z][A-Za-z0-9_]+$/)
  name: string;
  //@IsNumber()
  age: string;
  // age: number;
  @IsNotEmpty()
  phone: string;
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;
  @IsString()
  gender: string;
  //@IsDate()
  createdDate: Date;
  //@IsDate()
  updatedDate: Date;
  @MinLength(7)
  password: string;
  profileImg: string;
  createdByAdmin: number;
  createdByModerator: number;
}

export class PasswordChangeStudentDto {
  oldPassword: string;
  @MinLength(7)
  newPassword: string;
}

export class ForgetPassStudentDto {
  @IsEmail()
  email: string;
}
