import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import {
  ForgetPassModeratorDto,
  ModeratorDto,
  PasswordChangeModeratorDto,
  PasswordForgetModeratorDto,
} from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from 'src/Post/dto/post.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { Student } from 'src/Db/student.entity';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
import { SessionGuard } from 'src/Guards/session.guard';
import { Moderator } from 'src/Db/moderator.entity';
import { ModeratorProfile } from 'src/Db/moderatorProfile.dto';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

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
        destination: './uploads/moderator',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addModerator(
    @Body()
    moderator: ModeratorDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    moderator.profileImg = myfileobj.filename;
    moderator.createdDate = new Date();
    moderator.updatedDate = new Date();
    moderator.status = 'inactive';
    return this.moderatorService.addModerator(moderator);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginModerator(
    @Body() moderator: ModeratorLoginDto,
    @Session() session,
  ): Promise<any> {
    const res = this.moderatorService.loginModerator(moderator);

    if ((await res) === true) {
      session.email = moderator.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Moderator not found',
      });
    }
  }
  @Get('/myprofile')
  @UseGuards(SessionGuard)
  myProfile(@Session() session): any {
    return this.moderatorService.myProfile(session.email);
  }

  @Put('/updateprofile')
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuard)
  updateProfile(@Body() data: UpdateModeratorDto, @Session() session): any {
    return this.moderatorService.editProfile(data, session.email);
  }

  @Delete('/deleteProfile')
  @UseGuards(SessionGuard)
  deleteProfile(@Session() session): any {
    return this.moderatorService.deleteProfile(session.email);
  }

  @Post('/changePassword')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  changePassword(
    @Body() changedPass: PasswordChangeModeratorDto,
    @Session() session,
  ): any {
    return this.moderatorService.passwordChange(changedPass, session.email);
  }

  // @Delete('/deletestudent/:id')
  // deletStudent(@Param('id', ParseIntPipe) id: number) {
  //   return this.moderatorService.deleteStudent(id);
  // }

  // @Delete('/deleteHr/:id')
  // deletHr(@Param('id', ParseIntPipe) id: number) {
  //   return this.moderatorService.deleteHr(id);
  // }

  // @Post('/createpost')
  // addPost(@Body() data: PostDto) {
  //   return this.moderatorService.createPost(data);
  // }

  //
  @Post('/RegisterStudent')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 200000 },
      storage: diskStorage({
        destination: './uploads/student',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addStudent(
    @Body()
    student: StudentDto,
    @UploadedFile() myfileobj: Express.Multer.File,
    @Session() session,
  ): any {
    student.profileImg = myfileobj.filename;

    return this.moderatorService.addStudent(student, session.email);
  }

  @Get('/studentwithModerator/:id')
  getStudentByModeratorId(@Param('id', ParseIntPipe) id: number): any {
    return this.moderatorService.getStudentByModeratorId(id);
  }

  @Delete('/studentwithModerator/:id')
  deleteStudentByModeratorId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.deleteStudentByModeratorId(id, session.email);
  }

  @Put('/studentwithModerator/:id')
  @UsePipes(new ValidationPipe())
  updateStudentByModeratorId(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,

    @Session() session,
  ): any {
    return this.moderatorService.updateStudentByModeratorId(
      id,
      student,
      session.email,
    );
  }
  //
  @Delete('/post/:id')
  @UseGuards(SessionGuard)
  deletePost(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    console.log(id);
    return this.moderatorService.deletePost(id, session.email);
  }

  @Put('/report/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  reportHandling(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.reportHandling(id, session.email);
  }

  @Get('/post')
  @UseGuards(SessionGuard)
  allpost(@Session() session): any {
    return this.moderatorService.allPost(session.email);
  }

  @Get('/postComment/:id')
  @UseGuards(SessionGuard)
  allpostComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.allPostComment(id, session.email);
  }

  @Delete('/comment/:id')
  @UseGuards(SessionGuard)
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.deleteComment(id, session.email);
  }

  @Get('/report')
  @UseGuards(SessionGuard)
  allReport(@Session() session): any {
    return this.moderatorService.allReport(session.email);
  }

  @Get('/logout')
  @UseGuards(SessionGuard)
  moderatorLogout(@Session() session): any {
    if (session.destroy()) {
      return true;
    } else {
      return false;
    }
  }

  @Get('/studentPosts/:id')
  @UseGuards(SessionGuard)
  getStudentPost(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.getStudentPost(id, session.email);
  }

  @Get('/hrJobs/:id')
  @UseGuards(SessionGuard)
  gethrJobs(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    return this.moderatorService.getHrJobs(id, session.email);
  }

  @Get('/studentComment/:id')
  @UseGuards(SessionGuard)
  getStudentComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.moderatorService.getStudentComment(id, session.email);
  }

  @Get('/hrComments/:id')
  @UseGuards(SessionGuard)
  gethrComment(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    return this.moderatorService.getHrComment(id, session.email);
  }

  @Get('/getimage')
  @UseGuards(SessionGuard)
  async getting(@Res() res, @Session() session): Promise<any> {
    await this.moderatorService.getImages(res, session.email);
  }

  @Post('/sentmail')
  @UsePipes(new ValidationPipe())
  sentMail(@Body() data: PasswordForgetModeratorDto): any {
    return this.moderatorService.ForgetPassword(data.email);
  }

  @Patch('/forgetPassword')
  @UsePipes(new ValidationPipe())
  forgetPass(@Body() data: ForgetPassModeratorDto): any {
    return this.moderatorService.newPassword(data);
  }
}
