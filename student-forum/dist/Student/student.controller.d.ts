/// <reference types="multer" />
import { StudentService } from './student.service';
import { StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from './dto/Post.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): StudentDto;
    loginStudent(student: StudentLoginDto): any;
    myProfile(id: number): StudentDto;
    updateProfile(id: number, student: StudentDto): StudentDto;
    deleteProfile(id: number): StudentDto;
    getDashboard(): any;
    addPost(data: PostDto): any;
    updatePost(data: PostDto, id: number): any;
}
