/// <reference types="multer" />
import { ModeratorService } from './moderator.service';
import { ForgetPassModeratorDto, ModeratorDto, PasswordChangeModeratorDto } from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
export declare class ModeratorController {
    private readonly moderatorService;
    constructor(moderatorService: ModeratorService);
    addModerator(moderator: ModeratorDto, myfileobj: Express.Multer.File): ModeratorDto;
    loginModerator(moderator: ModeratorLoginDto, session: any): any;
    myProfile(id: number): ModeratorDto;
    updateProfile(id: number, moderator: UpdateModeratorDto): ModeratorDto;
    deleteProfile(id: number): ModeratorDto;
    getDashboard(): any;
    changePassword(id: number, moderator: PasswordChangeModeratorDto): any;
    forgetPassword(id: number, moderator: ForgetPassModeratorDto): any;
    deletStudent(id: number): string;
    deletHr(id: number): string;
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): any;
    getModeratorByModeratorId(id: number): any;
    deleteStudentByModeratorId(id: number, session: any): any;
    updateStudentByModeratorId(id: number, student: UpdateStudentDto, myfileobj: Express.Multer.File, session: any): any;
}
