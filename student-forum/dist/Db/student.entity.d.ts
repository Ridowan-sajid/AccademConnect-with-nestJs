import { Post } from './post.entity';
import { Hr } from './hiring.entity';
import { Comment } from './comment.entity';
import { Offer } from './offer.entity';
import { Report } from './report.entity';
export declare class Student {
    id: number;
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    connection: Hr[];
    profileImg: string;
    password: string;
    createdByModerator: number;
    createdByAdmin: number;
    posts: Post[];
    comments: Comment[];
    letters: Offer[];
    reports: Report[];
}
