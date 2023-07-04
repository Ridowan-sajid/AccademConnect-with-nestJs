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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';
import { UpdateAdminDTO } from './dto/updateAdmin.dto';
import { UpdateModeratorDto } from 'src/Moderator/dto/updateModerator.dto';
import { HrDto } from 'src/Hiring-Manager/dto/hr.dto';
import { UpdateHrDto } from 'src/Hiring-Manager/dto/updatehr.dto';
import { ModeratorAccessDto } from 'src/Moderator/dto/moderatorAccess.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  adminLogin(@Body() admin: AdminLoginDto): any {
    return this.adminService.adminLogin(admin);
  }

  @Post('/update/:id')
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() admin: UpdateAdminDTO,
  ): any {
    return this.adminService.updateAdmin(id, admin);
  }

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
  @UsePipes(new ValidationPipe())
  addStudent(
    @Body()
    student: StudentDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): StudentDto {
    student.profileImg = myfileobj.filename;
    return this.adminService.addStudent(student);
  }

  @Get('/student')
  getAllStudent(): any {
    return this.adminService.getAllStudent();
  }

  @Get('/student/:id')
  getStudentById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getStudentById();
  }

  @Get('/moderatorwithAdmin/:id')
  getModeratorByAdminId(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getModeratorByAdminId(id);
  }

  @Delete('/moderatorwithAdmin/:id')
  deleteModeratorByAdminId(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteModeratorByAdminId(id);
  }

  @Put('/moderatorwithAdmin/:id')
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
  updateModeratorByAdminId(
    @Param('id', ParseIntPipe) id: number,
    @Body() moderator: UpdateModeratorDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    moderator.profileImg = myfileobj.filename;
    return this.adminService.updateModeratorByAdminId(id, moderator);
  }

  @Put('/updateStudent/:id')
  @UsePipes(new ValidationPipe())
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
  ): any {
    return this.adminService.updateStudent(id, student);
  }

  @Delete('/deleteStudent/:id')
  deleteStudent(@Param('id', ParseIntPipe) id: number): any {
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
      limits: { fileSize: 200000 },
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
    return this.adminService.addModerator(moderator);
  }

  @Get('/moderator')
  getAllModerator(): any {
    return this.adminService.getAllModerator();
  }
  @Get('/moderator/:id')
  getModeratorById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getModeratorById(id);
  }

  @Put('/moderator/:id')
  @UsePipes(new ValidationPipe())
  updateModerator(
    @Param('id', ParseIntPipe) id: number,
    moderator: UpdateModeratorDto,
  ): ModeratorDto {
    return this.adminService.updateModerator(id, moderator);
  }

  @Delete('/moderator/:id')
  deleteModerator(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteModerator(id);
  }

  //Hr

  @Post('/RegisterHr')
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
  @UsePipes(new ValidationPipe())
  addHr(
    @Body()
    hr: HrDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    hr.profileImg = myfileobj.filename;
    return this.adminService.addHr(hr);
  }

  @Get('/hr')
  getAllHr(): any {
    return this.adminService.getAllHr();
  }
  @Get('/hr/:id')
  getHrById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getHrById(id);
  }

  @Put('/hr/:id')
  @UsePipes(new ValidationPipe())
  updateHr(@Param('id', ParseIntPipe) id: number, hr: UpdateHrDto): any {
    return this.adminService.updateHr(id, hr);
  }

  @Delete('/hr/:id')
  deleteHr(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteHr(id);
  }
  @Patch('moderatorAccess/:id')
  moderatorAccess(
    @Param('id', ParseIntPipe) id: number,
    access: ModeratorAccessDto,
  ): any {
    return this.adminService.accessControl(id, access);
  }

  @Get('/profile/:id')
  adminProfile(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.adminProfile(id);
  }
}
