import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from './dto/Post.dto';

@Injectable()
export class StudentService {
  getDashboard(): any {
    return 'Dashboard';
  }
  addStudent(student: StudentDto): any {
    return student;
  }
  loginStudent(student: StudentLoginDto): any {
    return student;
  }
  myProfile(id: number): any {
    return id;
  }
  editProfile(id: number, student: StudentDto): any {
    return student;
  }
  deleteProfile(id: number): any {
    return 'deleted';
  }
  addPost(post: PostDto): any {
    return 'Post added';
  }
  updatePost(id: number, post: PostDto): any {
    return post;
  }
}
