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

export class UpdateStudentDto {
  @IsString()
  @Matches(/^[A-Z][A-Za-z0-9_]+$/)
  name: string;
  //@IsNumber()
  age: string;
  // age: number;
  @IsNotEmpty()
  phone: string;
  @IsString()
  gender: string;
  //@IsDate()
  updatedDate: Date;
  profileImg: string;
}
