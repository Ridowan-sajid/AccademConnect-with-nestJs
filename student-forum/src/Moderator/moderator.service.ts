import { Injectable } from '@nestjs/common';
import { ModeratorDto, ModeratorLoginDto } from './dto/Moderator.dto';
import { PostDto } from 'src/Student/dto/Post.dto';

@Injectable()
export class ModeratorService {
  getDashboard(): any {}
  addModerator(moderator: ModeratorDto): any {}
  loginModerator(moderator: ModeratorLoginDto): any {}
  myProfile(id: number): any {}
  editProfile(name: string, moderator: ModeratorDto): any {}
  deleteProfile(id: number): any {}
  deleteStudent(id: number): any {}
  createPost(post: PostDto): any {}
}
