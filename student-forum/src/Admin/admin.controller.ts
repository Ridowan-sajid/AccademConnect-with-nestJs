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
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/registerStudent')
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
    return this.adminService.addStudent(student);
  }

  @Post('/login')
  adminLogin(admin: AdminLoginDto): any {
    return this.adminService.adminLogin(admin);
  }

  @Get('/studentList')
  getAllStudent(): any {
    return this.adminService.getAllStudent();
  }

  @Put('/updateStudent/:id')
  updateStudent(@Param() id: number, student: StudentDto): StudentDto {
    return this.adminService.updateStudent(id, student);
  }

  @Delete('/deleteStudent/:id')
  deleteStudent(@Param() id: number): any {
    return this.adminService.deleteStudent(id);
  }

  @Post('/RegisterModerator')
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
    return this.adminService.addModerator(moderator);
  }

  @Get('/moderatorList')
  getAllModerator(): any {
    return this.adminService.getAllModerator();
  }

  @Put('/updateModerator/:id')
  updateModerator(@Param() id: number, moderator: ModeratorDto): ModeratorDto {
    return this.adminService.updateModerator(id, moderator);
  }
}
