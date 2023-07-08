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

export class UpdateHrDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  // @IsNumber()
  @IsNotEmpty()
  age: string;
  @IsNotEmpty()
  @Length(11)
  phone: string;
  @IsString()
  gender: string;
  //@IsDate()
  updatedDate: Date;
  profileImg: string;
}
