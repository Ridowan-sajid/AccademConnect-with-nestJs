import { IsNumber } from 'class-validator';

export class HandledReportDto {
  @IsNumber()
  handledBy: number;
}
