import { Injectable } from '@nestjs/common';

import { PostDto } from 'src/Student/dto/Post.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';

@Injectable()
export class AdminService {
  addStudent(student: StudentDto): any {}
  adminLogin(admin: AdminLoginDto): any {}
  getAllStudent(): any {}
  updateStudent(id: number, student: StudentDto): any {}
  deleteStudent(id: number) {}
  getAllModerator(): any {}
  updateModerator(id: number, moderator: ModeratorDto): any {}
  addModerator(moderator: ModeratorDto): any {}
}
