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
  Session,
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
  async adminLogin(
    @Body() admin: AdminLoginDto,
    @Session() session,
  ): Promise<any> {
    const res = this.adminService.adminLogin(admin);

    if ((await res) === true) {
      session.email = admin.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Admin not found',
      });
    }
  }

  // @Post('/changePass')
  // @UsePipes(new ValidationPipe())
  // changePassword(): any {
  //   return this.adminService.changePass('Admin12345');
  // }

  @Put('/update')
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
        destination: './uploads/admin',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Body() admin: UpdateAdminDTO,
    @Session() session,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    //admin.profileImg = myfileobj.filename;
    admin.updatedDate = new Date();
    console.log(session.email);

    return this.adminService.updateAdmin(session.email, admin);
  }

  @Post('/addStudent')
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
        destination: './uploads/students',
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
    student.createdDate = new Date();
    student.updatedDate = new Date();

    return this.adminService.addStudent(student, session.email);
  }

  @Get('/student')
  getAllStudent(): any {
    return this.adminService.getAllStudent();
  }

  @Get('/studentwithAdmin')
  getStudentByAdminId(@Session() session): any {
    return this.adminService.getStudentByAdminId(session.email);
  }

  @Get('/student/:id')
  getStudentById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getStudentById();
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

  // @Get('/moderatorwithAdmin/:id')
  // getModeratorByAdminId(@Param('id', ParseIntPipe) id: number): any {
  //   return this.adminService.getModeratorByAdminId(id);
  // }

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
