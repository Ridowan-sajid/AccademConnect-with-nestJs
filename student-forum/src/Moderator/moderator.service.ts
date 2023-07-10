import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ForgetPassModeratorDto,
  ModeratorDto,
  ModeratorLoginDto,
  PasswordChangeModeratorDto,
} from './dto/Moderator.dto';
import { PostDto } from 'src/Post/dto/post.dto';
import {
  ProfileModeratorDto,
  UpdateModeratorDto,
} from './dto/updateModerator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moderator } from 'src/Db/moderator.entity';
import { Student } from 'src/Db/student.entity';
import * as bcrypt from 'bcrypt';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
import { ModeratorProfile } from 'src/Db/moderatorProfile.dto';
import { Post } from 'src/Db/post.entity';

import { Report } from 'src/Db/report.entity';
import { Comment } from 'src/Db/comment.entity';
import { Hr } from 'src/Db/hiring.entity';

@Injectable()
export class ModeratorService {
  async getHrComment(id: number, email: any): Promise<any> {
    const res = await this.hrRepo.find({
      where: { id: id },
      relations: {
        comments: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getStudentComment(id: number, email: any): Promise<any> {
    const res = await this.studentRepo.find({
      where: { id: id },
      relations: {
        comments: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getHrJobs(id: number, email: any): Promise<any> {
    const res = await this.hrRepo.find({
      where: { id: id },
      relations: {
        jobs: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getStudentPost(id: number, email: any): Promise<any> {
    const res = await this.studentRepo.find({
      where: { id: id },
      relations: {
        posts: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allReport(email: any): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      return await this.reportRepo.find();
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async deleteComment(id: number, email: any): Promise<any> {
    const res = await this.moderatorRepo.findOneBy({ email: email });
    if (res) {
      const com = await this.commentRepo.delete(id);
      return com;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allPostComment(id: number, email: string): Promise<any> {
    const res = await this.postRepo.find({
      where: { id: id },
      relations: {
        comments: { childComments: true },
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allPost(email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      return await this.postRepo.find();
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async reportHandling(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      const res = await this.reportRepo.findOneBy({ id: id });
      res.handledBy = mod.id;
      if (res) {
        return await this.reportRepo.update({ id: id }, res);
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the report',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async deletePost(id: number, email: any): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      const res = await this.postRepo.delete({ id: id });

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the post',
      });
    }
  }
  async deleteStudentByModeratorId(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });
    if (mod) {
      return this.studentRepo.delete({ id: id, createdByModerator: mod.id });
    } else {
      return 'Should be a moderator';
    }
  }
  async updateStudentByModeratorId(
    id: number,
    student: UpdateStudentDto,
    email: string,
  ): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });
    return this.studentRepo.update(
      { id: id, createdByModerator: mod.id },
      student,
    );
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
    @InjectRepository(ModeratorProfile)
    private moderatorProfileRepo: Repository<ModeratorProfile>,

    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,

    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(Hr)
    private hrRepo: Repository<Hr>,
  ) {}

  async addStudent(student: StudentDto, email: string): Promise<Student> {
    {
      const moderator = await this.moderatorRepo.findOneBy({ email: email });
      student.createdByModerator = moderator.id;
      student.createdDate = new Date();
      student.updatedDate = new Date();

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
  async passwordChange(
    changedPass: PasswordChangeModeratorDto,
    email: string,
  ): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({
      email: email,
    });
    const isMatch: boolean = await bcrypt.compare(
      changedPass.oldPassword,
      mod.password,
    );

    if (isMatch) {
      const salt = await bcrypt.genSalt();
      mod.password = await bcrypt.hash(changedPass.newPassword, salt);
      const res = await this.moderatorRepo.update(mod.id, mod);

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  getDashboard(): any {
    return '';
  }
  async deleteProfile(email: string): Promise<any> {
    const res2 = await this.moderatorProfileRepo.delete({ email: email });
    const res = await this.moderatorRepo.delete({ email: email });

    if (res && res2) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async editProfile(
    moderator: UpdateModeratorDto,
    email: string,
  ): Promise<any> {
    const res = await this.moderatorRepo.update({ email: email }, moderator);

    const res2 = await this.moderatorProfileRepo.update(
      { email: email },
      moderator,
    );

    if (res && res2) {
      return res2;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }
  async myProfile(email: string): Promise<ModeratorProfile> {
    const admin = await this.moderatorProfileRepo.findOneBy({ email: email });

    if (admin) {
      return admin;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async loginModerator(moderator: ModeratorLoginDto): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: moderator.email });
    if (mod) {
      const isMatch: boolean = await bcrypt.compare(
        moderator.password,
        mod.password,
      );
      if (isMatch) return isMatch;
    } else {
      return false;
    }
  }
  async addModerator(moderator: ModeratorDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    moderator.password = await bcrypt.hash(moderator.password, salt);

    const res = await this.moderatorRepo.save(moderator);

    if (res) {
      const profile: ProfileModeratorDto = {
        name: res.name,
        age: res.age,
        phone: res.phone,
        email: res.email,
        gender: res.gender,
        createdDate: res.createdDate,
        education: res.education,
        updatedDate: res.updatedDate,
        status: res.status,
        moderator: res.id,
      };
      await this.moderatorProfileRepo.save(profile);
      return res;
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }
}
