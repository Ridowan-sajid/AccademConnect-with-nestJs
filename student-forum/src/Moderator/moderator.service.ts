import { Injectable } from '@nestjs/common';
import {
  ForgetPassModeratorDto,
  ModeratorDto,
  ModeratorLoginDto,
  PasswordChangeModeratorDto,
} from './dto/Moderator.dto';
import { PostDto } from 'src/Post/dto/post.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moderator } from 'src/Db/moderator.entity';
import { Student } from 'src/Db/student.entity';
import * as bcrypt from 'bcrypt';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';

@Injectable()
export class ModeratorService {
  async deleteStudentByModeratorId(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });
    return this.studentRepo.delete({ id: id, createdBy: mod.id });
  }
  async updateStudentByModeratorId(
    id: number,
    student: UpdateStudentDto,
    email: string,
  ): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });
    return this.studentRepo.update({ id: id, createdBy: mod.id }, student);
  }
  async getStudentByModeratorId(id: number): Promise<any> {
    return this.moderatorRepo.find({
      where: { id: id },
      relations: {
        students: true,
      },
    });
  }
  constructor(
    @InjectRepository(Moderator) private moderatorRepo: Repository<Moderator>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async addStudent(student: StudentDto): Promise<Student> {
    {
      const moderator = await this.moderatorRepo.findOneBy({ id: 1 });
      student.type = 'Student';
      student.createdBy = moderator.id;
      student.createdDate = new Date();
      student.updatedDate = new Date();
      student.createdType = 'Moderator';

      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(student.password, salt);
      student.password = hassedpassed;

      return this.studentRepo.save(student);
    }
  }
  deleteHr(id: number) {
    return '';
  }
  deleteStudent(id: number) {
    return '';
  }
  forgetPassword(id: number, moderator: ForgetPassModeratorDto): any {
    return '';
  }
  passwordChange(id: number, moderator: PasswordChangeModeratorDto): any {
    return '';
  }
  getDashboard(): any {
    return '';
  }
  deleteProfile(id: number): any {
    return '';
  }
  editProfile(id: number, moderator: UpdateModeratorDto): any {
    return '';
  }
  myProfile(id: number): any {
    return '';
  }
  loginModerator(moderator: ModeratorLoginDto): any {
    return '';
  }
  addModerator(moderator: ModeratorDto): any {
    return '';
  }
}
