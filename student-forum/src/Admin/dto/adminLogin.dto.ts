import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class AdminLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  password: string;
}
