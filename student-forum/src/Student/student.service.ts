import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from './dto/Post.dto';

@Injectable()
export class StudentService {
  getDashboard(): any {}
  addStudent(student: StudentDto): any {}
  loginStudent(student: StudentLoginDto): any {}
  myProfile(id: number): any {}
  editProfile(id: number, student: StudentDto): any {}
  deleteProfile(id: number): any {}
  addPost(post: PostDto): any {}
  updatePost(id: number, post: PostDto): any {}
}
