import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
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
import * as bcrypt from 'bcrypt';
import { Post } from 'src/Db/post.entity';
import { OfferDTO } from 'src/OfferLetter/dto/offer.dto';
import { Student } from 'src/Db/student.entity';
import { Offer } from 'src/Db/offer.entity';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import { Comment } from 'src/Db/comment.entity';
import { UpdateHrDto } from './dto/updatehr.dto';

@Injectable()
export class HrService {
  async deleteHr(email: string): Promise<any> {
    const res = await this.hrRepo.delete({ email: email });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async getAllCandidate(id: number, email: string): Promise<any> {
    const res = await this.hrRepo.findOneBy({ email: email });

    if (res) {
      return await this.jobRepo.find({
        where: { id: id },
        relations: {
          students: true,
        },
      });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async addLetter(id: number, data: OfferDTO, email: string) {
    const res = await this.jobRepo.findOneBy({ id: id });

    const res2 = await this.hrRepo.findOneBy({ email: email });

    if (res && res2) {
      data.hr = res2.id;
      data.job = res.id;
      return await this.offerRepo.save(data);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getAllPost(email: string): Promise<Post[]> {
    const res = await this.postRepo.find();

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async getAllJob(email: string): Promise<Job[]> {
    const res = await this.hrRepo.findOneBy({
      email: email,
    });

    if (res) {
      const res2 = await this.jobRepo.find();
      return res2;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async getJobDetails(id: number, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });

    if (hr) {
      const res = await this.jobRepo.findOneBy({ id: id });
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Job Post Not Found',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  constructor(
    @InjectRepository(Hr) private hrRepo: Repository<Hr>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Offer) private offerRepo: Repository<Offer>,

    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async deleteJob(id: number, email: string) {
    const hr = await this.hrRepo.findOneBy({ email: email });

    if (hr) {
      const res = await this.jobRepo.delete({ id: id, hr: hr.id });

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the Job Post',
      });
    }
  }
  forgetpassword(id: number, data: ForgetPassHrDto): any {
    return '';
  }
  async passwordChange(data: PasswordChangeHrDto, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({
      email: email,
    });
    const isMatch: boolean = await bcrypt.compare(
      data.oldPassword,
      hr.password,
    );

    if (isMatch) {
      const salt = await bcrypt.genSalt();
      hr.password = await bcrypt.hash(data.newPassword, salt);
      const res = await this.hrRepo.update(hr.id, hr);

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }

  deleteProfile(id: number): any {
    return '';
  }
  async editProfile(data: UpdateHrDto, email: string): Promise<any> {
    const res = await this.hrRepo.update({ email: email }, data);

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }

  async myProfile(email: string): Promise<Hr> {
    const hr = await this.hrRepo.findOneBy({ email: email });

    if (hr) {
      return hr;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  dashboard(): any {
    return '';
  }
  async loginHr(hr: HrLoginDto): Promise<any> {
    const res = await this.hrRepo.findOneBy({ email: hr.email });
    if (res) {
      const isMatch: boolean = await bcrypt.compare(hr.password, res.password);
      if (isMatch) return isMatch;
    } else {
      return false;
    }
  }
  async addHr(hr: HrDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    hr.password = await bcrypt.hash(hr.password, salt);

    const res = await this.hrRepo.save(hr);

    if (res) {
      return res;
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }

  async addJob(data: JobDto, email: string) {
    const hr = await this.hrRepo.findOneBy({ email: email });
    if (hr) {
      data.createdDate = new Date();
      data.updatedDate = new Date();
      data.hr = hr.id;
      console.log(data.hr);
      const res = await this.jobRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }

  async deleteJobByHrId(id: number, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    return this.jobRepo.delete({ id: id, hr: hr.id });
  }
  async getJobByHrId(email: string): Promise<any> {
    const res = await this.hrRepo.find({
      where: { email: email },
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
  async updateJob(id: number, data: UpdateJobDto, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });

    if (hr) {
      return this.jobRepo.update({ id: id, hr: hr.id }, data);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async addComment(id: number, data: CommentDto, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    if (hr) {
      data.hr = hr.id;
      data.post = id;
      const res = await this.commentRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }

  async getPostComment(id: number, email: string): Promise<any> {
    const std = await this.hrRepo.findOneBy({ email: email });
    if (std) {
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
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async deleteComment(id: number, email: string): Promise<any> {
    const res = await this.hrRepo.findOneBy({ email: email });
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

  async addReplyComment(
    id: number,
    data: CommentDto,
    email: string,
  ): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    if (hr) {
      data.hr = hr.id;
      data.parentComment = id;
      const res = await this.commentRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }

  async getReplyComment(id: number, email: string): Promise<any> {
    const hr = await this.hrRepo.findOneBy({ email: email });
    if (hr) {
      const res = await this.commentRepo.find({
        where: { id: id },
        relations: {
          childComments: true,
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
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You are not valided',
      });
    }
  }

  async getImages(@Res() res, email: string): Promise<void> {
    const admin = await this.hrRepo.findOneBy({ email: email });

    if (admin) {
      res.sendFile(admin.profileImg, { root: './uploads/hr' });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
}
