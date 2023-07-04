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
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): StudentDto;
    loginStudent(student: StudentLoginDto, session: any): any;
    myProfile(id: number): StudentDto;
    updateProfile(id: number, student: UpdateStudentDto): StudentDto;
    deleteProfile(id: number): StudentDto;
    changePassword(id: number, student: PasswordChangeStudentDto): StudentDto;
    forgetPassword(id: number, student: ForgetPassStudentDto): StudentDto;
    getDashboard(): any;
    deletePost(id: number): string;
    myPost(id: number): string;
    addPost(id: number, data: PostDto): Promise<PostDto & import("../Db/post.entity").Post>;
    getPostByStudentId(id: number): any;
    deletePostByStudentId(id: number, session: any): any;
    updatePost(data: UpdatePostDto, id: number, session: any): Promise<any>;
}
