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
import { HrService } from './hr.service';
import { PostDto } from 'src/Student/dto/Post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { HrDto, HrLoginDto } from './dto/hr.dto';

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
  loginHr(hr: HrLoginDto): any {
    return this.hrService.loginHr(hr);
  }

  @Get('/')
  getDashboard(): any {
    return this.hrService.getPost();
  }

  @Get('/myprofile')
  myProfile(name: string): HrDto {
    return this.hrService.myProfile(name);
  }

  @Put('/updateprofile')
  updateProfile(name: string, hr: HrDto): HrDto {
    return this.hrService.updateProfile(name, hr);
  }

  @Delete('/deleteProfile')
  deleteProfile(id: number): any {
    return this.hrService.deleteProfile(id);
  }

  @Post('/createpost')
  addPost(@Body() data: PostDto) {
    return this.hrService.addPost(data);
  }

  @Put('/updatepost/:id')
  updatePost(@Body() data: PostDto, @Param('id', ParseIntPipe) id: number) {
    return this.hrService.updatePost(id, data);
  }
}
