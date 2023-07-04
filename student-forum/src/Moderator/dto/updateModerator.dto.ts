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

export class UpdateModeratorDto {
  @IsString()
  name: string;
  @IsNumber()
  age: string;
  // age: number;
  @IsNotEmpty()
  phone: string;
  @IsString()
  gender: string;
  // @IsDate()
  // updatedDate: Date;
  profileImg: string;
}
