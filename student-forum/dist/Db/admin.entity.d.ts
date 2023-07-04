import { Moderator } from './moderator.entity';
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
}
