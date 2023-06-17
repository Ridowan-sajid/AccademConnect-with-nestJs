import { Injectable } from '@nestjs/common';
import { HrDto, HrLoginDto } from './dto/hr.dto';
import { PostDto } from 'src/Student/dto/Post.dto';

@Injectable()
export class HrService {
  getPost(): any {
    return 'All Post';
  }
  addHr(hr: HrDto): any {
    return hr;
  }
  loginHr(hr: HrLoginDto): any {
    return hr;
  }
  myProfile(name: string): any {
    return name;
  }
  updateProfile(name: string, hr: HrDto): any {
    return hr;
  }
  deleteProfile(id: number): any {
    return 'Deleted';
  }
  addPost(post: PostDto): any {
    return 'Post added';
  }
  updatePost(id: number, post: PostDto): any {
    return 'Post updated';
  }
}
