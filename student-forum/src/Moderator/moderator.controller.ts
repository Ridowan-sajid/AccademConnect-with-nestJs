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
import { ModeratorService } from './moderator.service';
import { ModeratorDto } from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from 'src/Student/dto/Post.dto';

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
  loginModerator(moderator: ModeratorLoginDto): any {
    return this.moderatorService.loginModerator(moderator);
  }
  @Get('/myprofile')
  myProfile(id: number): ModeratorDto {
    return this.moderatorService.myProfile(id);
  }

  @Put('/updateprofile')
  updateProfile(name: string, moderator: ModeratorDto): ModeratorDto {
    return this.moderatorService.editProfile(name, moderator);
  }

  @Delete('/deleteProfile')
  deleteProfile(id: number): ModeratorDto {
    return this.moderatorService.deleteProfile(id);
  }

  @Get('/')
  getDashboard(): any {
    return this.moderatorService.getDashboard();
  }

  @Delete('/deletestudent/:id')
  deletStudent(@Param('id', ParseIntPipe) id: number) {
    return this.moderatorService.deleteStudent(id);
  }

  @Post('/createpost')
  addPost(@Body() data: PostDto) {
    return this.moderatorService.createPost(data);
  }
}
