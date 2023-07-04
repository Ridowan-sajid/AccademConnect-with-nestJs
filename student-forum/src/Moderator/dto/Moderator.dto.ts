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
import { Admin } from 'src/Db/admin.entity';

export class ModeratorDto {
  @IsString()
  name: string;
  //@IsNumber()
  age: string;
  @IsNotEmpty()
  phone: string;
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;
  @IsString()
  gender: string;
  // @IsDate()
  createdDate: Date;
  @IsString()
  education: string;
  // @IsDate()
  updatedDate: Date;
  @MinLength(7)
  password: string;
  profileImg: string;
  status: string;
  createdBy: number;
}

export class ModeratorLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  password: string;
}
export class PasswordChangeModeratorDto {
  oldPassword: string;
  @MinLength(7)
  newPassword: string;
}

export class ForgetPassModeratorDto {
  @IsEmail()
  email: string;
}
