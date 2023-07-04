import { Post } from './post.entity';
export declare class Student {
    id: number;
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    profileImg: string;
    password: string;
    type: string;
    createdType: string;
    createdBy: number;
    posts: Post[];
}
