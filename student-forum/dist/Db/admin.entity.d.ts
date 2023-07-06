import { Moderator } from './moderator.entity';
import { Student } from './student.entity';
import { Hr } from './hiring.entity';
export declare class Admin {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    profileImg: string;
    password: string;
    moderators: Moderator[];
    students: Student[];
    hrs: Hr[];
}
