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

export class HrDto {
  @IsString()
  name: string;
  // @IsNumber()
  age: string;
  @IsNotEmpty()
  phone: string;
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;
  @IsString()
  gender: string;
  // @IsDate()
  // createdDate: Date;
  // @IsDate()
  // updatedDate: Date;
  connection: string[];
  @MinLength(7)
  password: string;
  profileImg: string;
  // type: string;
  createdBy: number;
}

export class HrLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  password: string;
}
export class PasswordChangeHrDto {
  oldPassword: string;
  @MinLength(7)
  newPassword: string;
}

export class ForgetPassHrDto {
  @IsEmail()
  email: string;
}
