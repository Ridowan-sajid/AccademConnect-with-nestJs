import { Injectable } from '@nestjs/common';

import { PostDto } from 'src/Student/dto/Post.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';

@Injectable()
export class AdminService {
  addStudent(student: StudentDto): any {
    return student;
  }
  adminLogin(admin: AdminLoginDto): any {
    return admin;
  }
  getAllStudent(): any {
    return 'All student';
  }
  updateStudent(id: number, student: StudentDto): any {
    return student;
  }
  deleteStudent(id: number) {
    return 'Student Deleted';
  }
  getAllModerator(): any {
    return 'All Moderator';
  }
  updateModerator(id: number, moderator: ModeratorDto): any {
    return moderator;
  }
  addModerator(moderator: ModeratorDto): any {
    return moderator;
  }
}
