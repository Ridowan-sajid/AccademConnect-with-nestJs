import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateAdminDTO {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsNotEmpty()
  phone: string;
  // @IsEmail({}, { message: 'Email is not correct' })
  // email: string;
  @IsString()
  gender: string;
  @IsDate()
  createdDate: Date;
  @IsDate()
  updatedDate: Date;
  profileImg: string;
}
