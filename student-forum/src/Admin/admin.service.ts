import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PostDto } from 'src/Post/dto/post.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';
import { UpdateAdminDTO } from './dto/updateAdmin.dto';
import { UpdateModeratorDto } from 'src/Moderator/dto/updateModerator.dto';
import { HrDto } from 'src/Hiring-Manager/dto/hr.dto';
import { UpdateHrDto } from 'src/Hiring-Manager/dto/updatehr.dto';
import { ModeratorAccessDto } from 'src/Moderator/dto/moderatorAccess.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
import { Moderator } from 'src/Db/moderator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/Db/admin.entity';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/Db/student.entity';

@Injectable()
export class AdminService {
  // async changePass(password: string): Promise<any> {
  //   const salt = await bcrypt.genSalt();
  //   password = await bcrypt.hash(password, salt);
  //   return password;
  // }
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Moderator)
    private moderatorRepo: Repository<Moderator>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async getStudentByAdminId(email: string): Promise<Admin[]> {
    return this.adminRepo.find({
      where: { email: email },
      relations: {
        students: true,
      },
    });
  }

  adminProfile(id: number): any {
    return '';
  }
  accessControl(id: number, access: ModeratorAccessDto): any {
    return '';
  }
  deleteHr(id: number): any {
    return '';
  }
  updateHr(id: number, hr: UpdateHrDto): any {
    return '';
  }
  getHrById(id: number): any {
    return '';
  }
  getAllHr(): any {
    return '';
  }
  addHr(hr: HrDto): any {
    return '';
  }
  deleteModerator(id: number): any {
    return '';
  }
  deleteStudent(id: number): any {
    return '';
  }
  updateModerator(id: number, moderator: UpdateModeratorDto): any {
    return '';
  }
  getModeratorById(id: number): any {
    return '';
  }
  getAllModerator(): any {
    return '';
  }
  async addModerator(moderator: ModeratorDto): Promise<Moderator> {
    const admin = await this.adminRepo.findOneBy({ id: 1 });
    moderator.status = 'Inactive';
    moderator.createdBy = admin.id;
    moderator.createdDate = new Date();
    moderator.updatedDate = new Date();

    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(moderator.password, salt);
    moderator.password = hassedpassed;

    return this.moderatorRepo.save(moderator);
  }
  getAllStudent(): any {
    const res = this.studentRepo.find();

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  updateStudent(id: number, student: UpdateStudentDto): any {
    return '';
  }
  getStudentById(): any {
    return '';
  }
  async addStudent(student: StudentDto, email: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    student.password = await bcrypt.hash(student.password, salt);
    const adm = await this.studentRepo.findOneBy({ email: email });
    student.createdByAdmin = adm.id;
    const res = await this.studentRepo.save(student);

    if (res) {
      return res;
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }
  async updateAdmin(email: string, admin: UpdateAdminDTO): Promise<any> {
    const res = await this.adminRepo.update({ email: email }, admin);

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Admin not found',
      });
    }
  }
  async adminLogin(admin: AdminLoginDto): Promise<any> {
    const adm = await this.adminRepo.findOneBy({ email: admin.email });
    if (adm) {
      const isMatch: boolean = await bcrypt.compare(
        admin.password,
        adm.password,
      );
      if (isMatch) return isMatch;
    } else {
      return false;
    }
  }
  async deleteModeratorByAdminId(id: number): Promise<any> {
    return this.moderatorRepo.delete({ id: id, createdBy: 1 });
  }
  async updateModeratorByAdminId(
    id: number,
    moderator: UpdateModeratorDto,
  ): Promise<any> {
    return this.moderatorRepo.update({ id: id, createdBy: 1 }, moderator);
  }
}
