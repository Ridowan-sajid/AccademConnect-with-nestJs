import { Injectable } from '@nestjs/common';
import { ModeratorDto, ModeratorLoginDto } from './dto/Moderator.dto';
import { PostDto } from 'src/Student/dto/Post.dto';

@Injectable()
export class ModeratorService {
  getDashboard(): any {
    return 'All User';
  }
  addModerator(moderator: ModeratorDto): any {
    return moderator;
  }
  loginModerator(moderator: ModeratorLoginDto): any {
    return moderator;
  }
  myProfile(id: number): any {
    return id;
  }
  editProfile(name: string, moderator: ModeratorDto): any {
    return moderator;
  }
  deleteProfile(id: number): any {
    return 'deleted';
  }
  deleteStudent(id: number): any {
    return 'student deleted';
  }
  createPost(post: PostDto): any {
    return 'post created';
  }
}
