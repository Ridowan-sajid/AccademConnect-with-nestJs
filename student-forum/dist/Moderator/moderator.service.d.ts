import { ForgetPassModeratorDto, ModeratorDto, ModeratorLoginDto, PasswordChangeModeratorDto } from './dto/Moderator.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { Repository } from 'typeorm';
import { Moderator } from 'src/Db/moderator.entity';
import { Student } from 'src/Db/student.entity';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
export declare class ModeratorService {
    private moderatorRepo;
    private studentRepo;
    deleteStudentByModeratorId(id: number, email: string): Promise<any>;
    updateStudentByModeratorId(id: number, student: UpdateStudentDto, email: string): Promise<any>;
    getStudentByModeratorId(id: number): Promise<any>;
    constructor(moderatorRepo: Repository<Moderator>, studentRepo: Repository<Student>);
    addStudent(student: StudentDto): Promise<Student>;
    deleteHr(id: number): string;
    deleteStudent(id: number): string;
    forgetPassword(id: number, moderator: ForgetPassModeratorDto): any;
    passwordChange(id: number, moderator: PasswordChangeModeratorDto): any;
    getDashboard(): any;
    deleteProfile(id: number): any;
    editProfile(id: number, moderator: UpdateModeratorDto): any;
    myProfile(id: number): any;
    loginModerator(moderator: ModeratorLoginDto): any;
    addModerator(moderator: ModeratorDto): any;
}
