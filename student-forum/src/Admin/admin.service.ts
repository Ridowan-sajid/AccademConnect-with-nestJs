import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ParseIntPipe,
  Res,
  ServiceUnavailableException,
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
import { Hr } from 'src/Db/hiring.entity';
import { PasswordChangeAdminDto } from './dto/changePassAdmin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Moderator)
    private moderatorRepo: Repository<Moderator>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Hr)
    private hrRepo: Repository<Hr>,
  ) {}

  async changePassword(
    changedPass: PasswordChangeAdminDto,
    email: string,
  ): Promise<any> {
    const admin = await this.adminRepo.findOneBy({
      email: email,
    });
    const isMatch: boolean = await bcrypt.compare(
      changedPass.oldPassword,
      admin.password,
    );
    console.log(changedPass.oldPassword);

    if (isMatch) {
      const salt = await bcrypt.genSalt();
      admin.password = await bcrypt.hash(changedPass.newPassword, salt);
      const res = await this.adminRepo.update(admin.id, admin);

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async getStudentByAdminId(email: string): Promise<Admin[]> {
    const res = await this.adminRepo.find({
      where: { email: email },
      relations: {
        students: true,
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

  async adminProfile(email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      return admin;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async accessControl(
    id: number,
    access: ModeratorAccessDto,
    email: string,
  ): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      //access.status = 'Active';
      const res = await this.moderatorRepo.update(id, access);
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async deleteHr(id: number, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    if (admin) {
      const res = await this.hrRepo.delete(id);

      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async updateHr(id: number, hr: UpdateHrDto, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      const res = await this.hrRepo.update(id, hr);
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async getHrById(id: number, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    console.log(email);

    if (admin) {
      const res = await this.hrRepo.findOneBy({ id: id });
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async getAllHr(email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    if (admin) {
      const res = await this.hrRepo.find();

      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not an admin',
      });
    }
  }
  async addHr(hr: HrDto, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      hr.createdByAdmin = admin.id;
      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(hr.password, salt);
      hr.password = hassedpassed;

      const res = this.hrRepo.save(hr);
      if (res) {
        return res;
      } else {
        throw new ServiceUnavailableException({
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not an admin',
      });
    }
  }
  async deleteStudent(id: number, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    if (admin) {
      const res = await this.studentRepo.delete(id);

      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }

  async getModeratorByAdminId(email: any): Promise<any> {
    const res = await this.adminRepo.find({
      where: { email: email },
      relations: {
        moderators: true,
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

  async getModeratorById(id: number, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      const res = await this.moderatorRepo.findOneBy({ id: id });
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async getAllModerator(email: string): Promise<Moderator[]> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    if (admin) {
      const res = await this.moderatorRepo.find();

      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not an admin',
      });
    }
  }
  async addModerator(
    moderator: ModeratorDto,
    email: string,
  ): Promise<Moderator> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      moderator.status = 'Inactive';
      moderator.createdBy = admin.id;

      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(moderator.password, salt);
      moderator.password = hassedpassed;

      const res = await this.moderatorRepo.save(moderator);
      if (res) {
        return res;
      } else {
        throw new ServiceUnavailableException({
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not an admin',
      });
    }
  }
  async getAllStudent(): Promise<Student[]> {
    const res = await this.studentRepo.find();

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async updateStudent(
    id: number,
    student: UpdateStudentDto,
    email: string,
  ): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    console.log(email);

    if (admin) {
      const res = await this.studentRepo.update(id, student);
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async getStudentById(id: number, email: string): Promise<Student> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    console.log(email);

    if (admin) {
      const res = await this.studentRepo.findOneBy({ id: id });
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
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
  async deleteModeratorByAdminId(id: number, email: string): Promise<any> {
    const admin = await this.adminRepo.findOneBy({ email: email });
    if (admin) {
      const res = await this.moderatorRepo.delete(id);

      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }
  async updateModeratorByAdminId(
    id: number,
    moderator: UpdateModeratorDto,
    email: string,
  ): Promise<any> {
    //return this.moderatorRepo.update({ id: id, createdBy: 1 }, moderator);

    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      const res = await this.moderatorRepo.update(id, moderator);
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the user',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not the valid admin',
      });
    }
  }

  async getHrWithAdmin(email: any): Promise<any> {
    const res = await this.adminRepo.find({
      where: { email: email },
      relations: {
        hrs: true,
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

  async getImages(@Res() res, email: string): Promise<void> {
    const admin = await this.adminRepo.findOneBy({ email: email });

    if (admin) {
      res.sendFile(admin.profileImg, { root: './uploads/admin' });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
}
