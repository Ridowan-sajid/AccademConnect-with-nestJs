import { Job } from './job.entity';
export declare class Hr {
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
    jobs: Job[];
}
