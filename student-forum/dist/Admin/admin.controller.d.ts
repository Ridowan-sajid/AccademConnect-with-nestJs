/// <reference types="multer" />
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';
import { UpdateAdminDTO } from './dto/updateAdmin.dto';
import { UpdateModeratorDto } from 'src/Moderator/dto/updateModerator.dto';
import { HrDto } from 'src/Hiring-Manager/dto/hr.dto';
import { UpdateHrDto } from 'src/Hiring-Manager/dto/updatehr.dto';
import { ModeratorAccessDto } from 'src/Moderator/dto/moderatorAccess.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    adminLogin(admin: AdminLoginDto): any;
    updateAdmin(id: number, admin: UpdateAdminDTO): any;
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): StudentDto;
    getAllStudent(): any;
    getStudentById(id: number): any;
    getModeratorByAdminId(id: number): any;
    deleteModeratorByAdminId(id: number): any;
    updateModeratorByAdminId(id: number, moderator: UpdateModeratorDto, myfileobj: Express.Multer.File): any;
    updateStudent(id: number, student: UpdateStudentDto): any;
    deleteStudent(id: number): any;
    addModerator(moderator: ModeratorDto, myfileobj: Express.Multer.File): any;
    getAllModerator(): any;
    getModeratorById(id: number): any;
    updateModerator(id: number, moderator: UpdateModeratorDto): ModeratorDto;
    deleteModerator(id: number): any;
    addHr(hr: HrDto, myfileobj: Express.Multer.File): any;
    getAllHr(): any;
    getHrById(id: number): any;
    updateHr(id: number, hr: UpdateHrDto): any;
    deleteHr(id: number): any;
    moderatorAccess(id: number, access: ModeratorAccessDto): any;
    adminProfile(id: number): any;
}
