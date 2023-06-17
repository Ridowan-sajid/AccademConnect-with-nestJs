import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from './dto/Post.dto';

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
  loginStudent(student: StudentLoginDto): any {
    return this.studentService.loginStudent(student);
  }
  @Get('/myprofile')
  myProfile(id: number): StudentDto {
    return this.studentService.myProfile(id);
  }

  @Put('/updateprofile')
  updateProfile(id: number, student: StudentDto): StudentDto {
    return this.studentService.editProfile(id, student);
  }

  @Delete('/deleteProfile')
  deleteProfile(id: number): StudentDto {
    return this.studentService.deleteProfile(id);
  }

  @Get('/')
  getDashboard(): any {
    return this.studentService.getDashboard();
  }

  @Post('/createpost')
  addPost(@Body() data: PostDto) {
    return this.studentService.addPost(data);
  }

  @Put('/updatepost/:id')
  updatePost(@Body() data: PostDto, @Param('id', ParseIntPipe) id: number) {
    return this.studentService.updatePost(id, data);
  }
}
