import { IsDate, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  @IsDate()
  createdDate: Date;
  @IsDate()
  updatedDate: Date;
  studentId: number;
}
