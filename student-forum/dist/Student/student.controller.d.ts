/// <reference types="multer" />
import { StudentService } from './student.service';
import { ForgetPassStudentDto, PasswordChangeStudentDto, StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from '../Post/dto/post.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): any;
    loginStudent(student: StudentLoginDto, session: any): Promise<any>;
    myProfile(session: any): any;
    updateProfile(student: UpdateStudentDto, session: any): any;
    deleteProfile(id: number): StudentDto;
    changePassword(student: PasswordChangeStudentDto, session: any): any;
    forgetPassword(id: number, student: ForgetPassStudentDto): StudentDto;
    getDashboard(session: any): any;
    addPost(data: PostDto, session: any): Promise<any>;
    getMyPost(session: any): any;
    getPostByStudentId(id: number, session: any): any;
    deletePostByStudentId(id: number, session: any): any;
    updatePost(data: UpdatePostDto, id: number, session: any): Promise<any>;
    Logout(session: any): any;
    getting(res: any, session: any): Promise<any>;
}
