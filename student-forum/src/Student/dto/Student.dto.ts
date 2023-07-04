import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  minLength,
} from 'class-validator';

export class StudentDto {
  @IsString()
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
  @IsDate()
  createdDate: Date;
  @IsDate()
  updatedDate: Date;
  // connection: string[];
  @MinLength(7)
  password: string;
  profileImg: string;
  createdType: string;
  type: string;
  createdBy: number;
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
