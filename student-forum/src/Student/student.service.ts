import { Injectable } from '@nestjs/common';
import {
  ForgetPassStudentDto,
  PasswordChangeStudentDto,
  StudentDto,
} from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from '../Post/dto/post.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/Db/student.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/Db/post.entity';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';

@Injectable()
export class StudentService {
  async deletePostByStudentId(id: number, email: string): Promise<any> {
    const stud = await this.studentRepo.findOneBy({ email: email });
    return this.postRepo.delete({ id: id, student: stud.id });
  }
  async getPostByStudentId(id: number): Promise<any> {
    return this.studentRepo.find({
      where: { id: id },
      relations: {
        posts: true,
      },
    });
  }
  async updatePost(
    id: number,
    data: UpdatePostDto,
    email: string,
  ): Promise<any> {
    const stud = await this.studentRepo.findOneBy({ email: email });
    return this.postRepo.update({ id: id, student: stud.id }, data);
  }
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}
  myPost(id: number) {
    return '';
  }
  forgetpassword(id: number, student: ForgetPassStudentDto): any {
    return '';
  }
  passwordChange(id: number, student: PasswordChangeStudentDto): any {
    return '';
  }
  deletePost(id: number) {
    return '';
  }

  addPost(data: PostDto, id: number) {
    data.createdDate = new Date();
    data.updatedDate = new Date();
    data.studentId = id;

    return this.postRepo.save(data);
  }
  getDashboard(): any {
    return '';
  }
  deleteProfile(id: number): any {
    return '';
  }
  editProfile(id: number, student: UpdateStudentDto): any {
    return '';
  }
  myProfile(id: number): any {
    return '';
  }
  loginStudent(student: StudentLoginDto): any {
    return '';
  }
  addStudent(student: StudentDto): any {
    return '';
  }
}
