import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class OfferDTO {
  @IsString()
  title: string;
  @IsString()
  letter: string;
  @IsDate()
  createdDate: Date;
  studentId: number;
  @IsNotEmpty()
  jobId: number;
  hrId: string;
}
