import { IsDate, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  text: string;
  @IsDate()
  createdDate: Date;
  post: number;
  hr: number;
  student: number;
  parentComment: number;
}
