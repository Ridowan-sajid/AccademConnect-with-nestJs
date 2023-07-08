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
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsNumber()
  age: string;
  @IsNotEmpty()
  phone: string;
  @IsString()
  gender: string;
  //@IsDate()
  updatedDate: Date;
  //profileImg: string;
}
