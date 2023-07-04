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
    deletePostByStudentId(id: number, email: string): Promise<any>;
    getPostByStudentId(id: number): Promise<any>;
    updatePost(id: number, data: UpdatePostDto, email: string): Promise<any>;
    constructor(studentRepo: Repository<Student>, postRepo: Repository<Post>);
    myPost(id: number): string;
    forgetpassword(id: number, student: ForgetPassStudentDto): any;
    passwordChange(id: number, student: PasswordChangeStudentDto): any;
    deletePost(id: number): string;
    addPost(data: PostDto, id: number): Promise<PostDto & Post>;
    getDashboard(): any;
    deleteProfile(id: number): any;
    editProfile(id: number, student: UpdateStudentDto): any;
    myProfile(id: number): any;
    loginStudent(student: StudentLoginDto): any;
    addStudent(student: StudentDto): any;
}
