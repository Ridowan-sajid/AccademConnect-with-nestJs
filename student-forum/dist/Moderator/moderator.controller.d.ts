/// <reference types="multer" />
import { ModeratorService } from './moderator.service';
import { ModeratorDto } from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { PostDto } from 'src/Student/dto/Post.dto';
export declare class ModeratorController {
    private readonly moderatorService;
    constructor(moderatorService: ModeratorService);
    addModerator(moderator: ModeratorDto, myfileobj: Express.Multer.File): ModeratorDto;
    loginModerator(moderator: ModeratorLoginDto): any;
    myProfile(id: number): ModeratorDto;
    updateProfile(name: string, moderator: ModeratorDto): ModeratorDto;
    deleteProfile(id: number): ModeratorDto;
    getDashboard(): any;
    deletStudent(id: number): any;
    addPost(data: PostDto): any;
}
