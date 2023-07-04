import { Injectable } from '@nestjs/common';
import {
  ForgetPassHrDto,
  HrDto,
  HrLoginDto,
  PasswordChangeHrDto,
} from './dto/hr.dto';
import { PostDto } from 'src/Post/dto/post.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hr } from 'src/Db/hiring.entity';
import { Repository } from 'typeorm';
import { Job } from 'src/Db/job.entity';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Hr) private hrRepo: Repository<Hr>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
  ) {}

  deleteJob(id: number) {
    return '';
  }
  forgetpassword(id: number, data: ForgetPassHrDto): any {
    return '';
  }
  passwordChange(id: number, data: PasswordChangeHrDto): any {
    return '';
  }

  deleteProfile(id: number): any {
    return '';
  }
  updateProfile(id: number, hr: HrDto): any {
    return '';
  }
  myProfile(id: number): any {
    return '';
  }
  dashboard(): any {
    return '';
  }
  loginHr(hr: HrLoginDto): any {
    return '';
  }
  addHr(hr: HrDto): any {
    return '';
  }

  addJob(data: JobDto, id: number) {
    data.createdDate = new Date();
    data.updatedDate = new Date();
    data.type = 'Hr';
    data.hr = id;

    return this.jobRepo.save(data);
  }

  async deleteJobByHrId(id: number, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    return this.jobRepo.delete({ id: id, hr: hr.id });
  }
  async getJobByHrId(id: number): Promise<any> {
    return this.hrRepo.find({
      where: { id: id },
      relations: {
        jobs: true,
      },
    });
  }
  async updateJob(id: number, data: UpdateJobDto, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    return this.jobRepo.update({ id: id, hr: hr.id }, data);
  }
}
