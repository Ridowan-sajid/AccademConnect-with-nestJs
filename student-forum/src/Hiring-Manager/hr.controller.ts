import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HrService } from './hr.service';
import { PostDto } from 'src/Post/dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import {
  ForgetPassHrDto,
  HrDto,
  HrLoginDto,
  PasswordChangeHrDto,
} from './dto/hr.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post('/Register')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addHr(
    @Body()
    hr: HrDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): HrDto {
    hr.profileImg = myfileobj.filename;
    return this.hrService.addHr(hr);
  }

  @Post('/login')
  loginHr(@Body() hr: HrLoginDto): any {
    return this.hrService.loginHr(hr);
  }

  @Get('/')
  getDashboard(): any {
    return this.hrService.dashboard();
  }

  @Get('/myprofile/:id')
  myProfile(@Param('id', ParseIntPipe) id: number): HrDto {
    return this.hrService.myProfile(id);
  }

  @Put('/updateprofile/:id')
  updateProfile(@Param('id', ParseIntPipe) id: number, hr: HrDto): HrDto {
    return this.hrService.updateProfile(id, hr);
  }

  @Delete('/deleteProfile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): any {
    return this.hrService.deleteProfile(id);
  }

  @Patch('/changePassword/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PasswordChangeHrDto,
  ): any {
    return this.hrService.passwordChange(id, data);
  }

  @Patch('/forgetPassword/:id')
  forgetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ForgetPassHrDto,
  ): any {
    return this.hrService.forgetpassword(id, data);
  }

  @Delete('/deleteJob/:id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.deleteJob(id);
  }

  @Post('/createjob/:id')
  addJob(@Param('id', ParseIntPipe) id: number, @Body() data: JobDto) {
    return this.hrService.addJob(data, id);
  }
  @Get('/jobWithHr/:id')
  getJobByHrId(@Param('id', ParseIntPipe) id: number): any {
    return this.hrService.getJobByHrId(id);
  }

  @Delete('/jobWithHr/:id')
  deleteJobByHrId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.deleteJobByHrId(id, session.email);
  }

  @Put('/jobWithHr/:id')
  updateJobByHrId(
    @Body() data: UpdateJobDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ) {
    return this.hrService.updateJob(id, data, session.email);
  }
}
