import { Injectable } from '@nestjs/common';
import { HrDto, HrLoginDto } from './dto/hr.dto';
import { PostDto } from 'src/Student/dto/Post.dto';

@Injectable()
export class HrService {
  getPost(): any {}
  addHr(hr: HrDto): any {}
  loginHr(hr: HrLoginDto): any {}
  myProfile(name: string): any {}
  updateProfile(name: string, hr: HrDto): any {}
  deleteProfile(id: number): any {}
  addPost(post: PostDto): any {}
  updatePost(id: number, post: PostDto): any {}
}
