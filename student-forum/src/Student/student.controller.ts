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
        destination: './uploads',
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
  ): StudentDto {
    student.profileImg = myfileobj.filename;
    return this.studentService.addStudent(student);
  }

  @Post('/login')
  loginStudent(@Body() student: StudentLoginDto, @Session() session): any {
    session.email = student.email;
    return this.studentService.loginStudent(student);
  }
  @Get('/myprofile/:id')
  myProfile(@Param('id', ParseIntPipe) id: number): StudentDto {
    return this.studentService.myProfile(id);
  }

  @Put('/updateprofile/:id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
  ): StudentDto {
    return this.studentService.editProfile(id, student);
  }

  @Delete('/deleteProfile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): StudentDto {
    return this.studentService.deleteProfile(id);
  }

  @Patch('/changePassword/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: PasswordChangeStudentDto,
  ): StudentDto {
    return this.studentService.passwordChange(id, student);
  }

  @Patch('/forgetPassword/:id')
  forgetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: ForgetPassStudentDto,
  ): StudentDto {
    return this.studentService.forgetpassword(id, student);
  }

  @Get('/')
  getDashboard(): any {
    return this.studentService.getDashboard();
  }

  @Delete('/deletepost/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deletePost(id);
  }

  @Get('/myPost/:id')
  myPost(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.myPost(id);
  }

  @Post('/createpost/:id')
  addPost(@Param('id', ParseIntPipe) id: number, @Body() data: PostDto) {
    return this.studentService.addPost(data, id);
  }
  @Get('/PostwithStudent/:id')
  getPostByStudentId(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.getPostByStudentId(id);
  }

  @Delete('/PostwithStudent/:id')
  deletePostByStudentId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.deletePostByStudentId(id, session.email);
  }

  @Put('/PostwithStudent/:id')
  updatePost(
    @Body() data: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ) {
    return this.studentService.updatePost(id, data, session.email);
  }
}
