/// <reference types="multer" />
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): StudentDto;
    adminLogin(admin: AdminLoginDto): any;
    getAllStudent(): any;
    updateStudent(id: number, student: StudentDto): StudentDto;
    deleteStudent(id: number): any;
    addModerator(moderator: ModeratorDto, myfileobj: Express.Multer.File): ModeratorDto;
    getAllModerator(): any;
    updateModerator(id: number, moderator: ModeratorDto): ModeratorDto;
}
