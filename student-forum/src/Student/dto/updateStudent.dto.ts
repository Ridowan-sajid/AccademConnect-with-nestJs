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

export class UpdateStudentDto {
  @IsString()
  name: string;
  //@IsNumber()
  age: string;
  @IsNotEmpty()
  phone: string;
  @IsString()
  gender: string;
  @IsDate()
  //   updatedDate: Date;
  profileImg: string;
}
