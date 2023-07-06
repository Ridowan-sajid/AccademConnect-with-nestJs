import { IsString } from 'class-validator';

export class ModeratorAccessDto {
  @IsString()
  status: string;
}
