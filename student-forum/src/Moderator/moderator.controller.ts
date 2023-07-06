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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import {
  ForgetPassModeratorDto,
  ModeratorDto,
  PasswordChangeModeratorDto,
} from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from 'src/Post/dto/post.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { Student } from 'src/Db/student.entity';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';

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
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addModerator(
    @Body()
    moderator: ModeratorDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): ModeratorDto {
    moderator.profileImg = myfileobj.filename;
    return this.moderatorService.addModerator(moderator);
  }

  @Post('/login')
  loginModerator(
    @Body() moderator: ModeratorLoginDto,
    @Session() session,
  ): any {
    console.log(moderator);

    session.email = moderator.email;
    return this.moderatorService.loginModerator(moderator);
  }
  @Get('/myprofile/:id')
  myProfile(id: number): ModeratorDto {
    return this.moderatorService.myProfile(id);
  }

  @Put('/updateprofile/:id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    moderator: UpdateModeratorDto,
  ): ModeratorDto {
    return this.moderatorService.editProfile(id, moderator);
  }

  @Delete('/deleteProfile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): ModeratorDto {
    return this.moderatorService.deleteProfile(id);
  }

  @Get('/')
  getDashboard(): any {
    return this.moderatorService.getDashboard();
  }

  @Patch('/changePassword/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() moderator: PasswordChangeModeratorDto,
  ): any {
    return this.moderatorService.passwordChange(id, moderator);
  }

  @Patch('/forgetPassword/:id')
  forgetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() moderator: ForgetPassModeratorDto,
  ): any {
    return this.moderatorService.forgetPassword(id, moderator);
  }

  @Delete('/deletestudent/:id')
  deletStudent(@Param('id', ParseIntPipe) id: number) {
    return this.moderatorService.deleteStudent(id);
  }

  @Delete('/deleteHr/:id')
  deletHr(@Param('id', ParseIntPipe) id: number) {
    return this.moderatorService.deleteHr(id);
  }

  // @Post('/createpost')
  // addPost(@Body() data: PostDto) {
  //   return this.moderatorService.createPost(data);
  // }

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
        destination: './uploads/student',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  updateStudentByModeratorId(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
    @UploadedFile() myfileobj: Express.Multer.File,
    @Session() session,
  ): any {
    student.profileImg = myfileobj.filename;
    return this.moderatorService.updateStudentByModeratorId(
      id,
      student,
      session.email,
    );
  }
}
