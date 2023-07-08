import { ForgetPassStudentDto, PasswordChangeStudentDto, StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from '../Post/dto/post.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from 'src/Db/student.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/Db/post.entity';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
export declare class StudentService {
    private studentRepo;
    private postRepo;
    getDetailsPost(id: number, email: any): Promise<any>;
    getAllPost(email: string): Promise<Post[]>;
    constructor(studentRepo: Repository<Student>, postRepo: Repository<Post>);
    deletePostByStudentId(id: number, email: string): Promise<any>;
    getMyPost(email: string): Promise<any>;
    updatePost(id: number, data: UpdatePostDto, email: string): Promise<any>;
    myPost(id: number): string;
    forgetpassword(id: number, student: ForgetPassStudentDto): any;
    passwordChange(changedPass: PasswordChangeStudentDto, email: string): Promise<any>;
    addPost(data: PostDto, email: string): Promise<any>;
    getDashboard(): any;
    deleteProfile(id: number): any;
    editProfile(student: UpdateStudentDto, email: string): Promise<any>;
    myProfile(email: string): Promise<Student>;
    loginStudent(student: StudentLoginDto): Promise<any>;
    addStudent(student: StudentDto): Promise<any>;
    getImages(res: any, email: string): Promise<void>;
}
