import { IsDate, IsString } from 'class-validator';

export class JobDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  @IsDate()
  createdDate: Date;
  @IsDate()
  updatedDate: Date;
  hr: number;
}
