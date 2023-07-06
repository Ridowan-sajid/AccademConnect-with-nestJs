import { IsDate, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  @IsDate()
  updatedDate: Date;
}
