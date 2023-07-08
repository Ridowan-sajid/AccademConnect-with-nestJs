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
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  ForgetPassStudentDto,
  PasswordChangeStudentDto,
  StudentDto,
} from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from '../Post/dto/post.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
import { Student } from 'src/Db/student.entity';
import { SessionGuard } from 'src/Guards/session.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

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
        destination: './uploads/student',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addStudent(
    @Body()
    student: StudentDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    student.profileImg = myfileobj.filename;
    student.createdDate = new Date();
    student.updatedDate = new Date();

    return this.studentService.addStudent(student);
  }

  @Post('/login')
  async loginStudent(
    @Body() student: StudentLoginDto,
    @Session() session,
  ): Promise<any> {
    const res = this.studentService.loginStudent(student);

    if ((await res) === true) {
      session.email = student.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Student not found',
      });
    }
  }

  @Get('/myprofile')
  @UseGuards(SessionGuard)
  myProfile(@Session() session): any {
    return this.studentService.myProfile(session.email);
  }

  @Put('/updateprofile')
  @UseGuards(SessionGuard)
  updateProfile(@Body() student: UpdateStudentDto, @Session() session): any {
    student.updatedDate = new Date();
    return this.studentService.editProfile(student, session.email);
  }

  @Delete('/deleteProfile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): StudentDto {
    return this.studentService.deleteProfile(id);
  }

  @Patch('/changePassword')
  @UseGuards(SessionGuard)
  changePassword(
    @Body() student: PasswordChangeStudentDto,
    @Session() session,
  ): any {
    return this.studentService.passwordChange(student, session.email);
  }

  @Patch('/forgetPassword/:id')
  @UseGuards(SessionGuard)
  forgetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: ForgetPassStudentDto,
  ): StudentDto {
    return this.studentService.forgetpassword(id, student);
  }

  @Get('/allPost')
  @UseGuards(SessionGuard)
  getDashboard(@Session() session): any {
    return this.studentService.getAllPost(session.email);
  }

  @Post('/post')
  @UseGuards(SessionGuard)
  addPost(@Body() data: PostDto, @Session() session) {
    return this.studentService.addPost(data, session.email);
  }
  @Get('/mypost')
  @UseGuards(SessionGuard)
  getMyPost(@Session() session): any {
    return this.studentService.getMyPost(session.email);
  }

  @Get('/post/:id')
  @UseGuards(SessionGuard)
  getPostByStudentId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.getDetailsPost(id, session.email);
  }

  @Delete('/post/:id')
  @UseGuards(SessionGuard)
  deletePostByStudentId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    console.log(id);
    return this.studentService.deletePostByStudentId(id, session.email);
  }

  @Put('/Post/:id')
  @UseGuards(SessionGuard)
  updatePost(
    @Body() data: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ) {
    return this.studentService.updatePost(id, data, session.email);
  }

  @Get('/logout')
  @UseGuards(SessionGuard)
  Logout(@Session() session): any {
    if (session.destroy()) {
      return true;
    } else {
      return false;
    }
  }

  @Get('/getimage')
  @UseGuards(SessionGuard)
  async getting(@Res() res, @Session() session): Promise<any> {
    await this.studentService.getImages(res, session.email);
  }
}
