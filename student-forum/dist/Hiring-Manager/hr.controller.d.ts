/// <reference types="multer" />
import { HrService } from './hr.service';
import { PostDto } from 'src/Student/dto/Post.dto';
import { HrDto, HrLoginDto } from './dto/hr.dto';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    addHr(hr: HrDto, myfileobj: Express.Multer.File): HrDto;
    loginHr(hr: HrLoginDto): any;
    getDashboard(): any;
    myProfile(name: string): HrDto;
    updateProfile(name: string, hr: HrDto): HrDto;
    deleteProfile(id: number): any;
    addPost(data: PostDto): any;
    updatePost(data: PostDto, id: number): any;
}
