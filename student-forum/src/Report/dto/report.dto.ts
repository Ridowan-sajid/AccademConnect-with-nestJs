import { IsDate, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  @IsDate()
  createdDate: Date;
  hrId: number;
  studentId: number;
  postId: number;
  jobId: number;
  handledById: number;
}
