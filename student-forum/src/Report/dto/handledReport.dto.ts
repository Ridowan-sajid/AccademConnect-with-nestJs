import { IsNumber } from 'class-validator';

export class HandledReportDto {
  @IsNumber()
  handledById: number;
}
