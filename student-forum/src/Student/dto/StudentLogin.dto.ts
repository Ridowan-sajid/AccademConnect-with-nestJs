import { IsEmail, IsString } from 'class-validator';

export class StudentLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  password: string;
}
