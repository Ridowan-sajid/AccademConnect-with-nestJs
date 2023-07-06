import { Comment } from './comment.entity';
import { Report } from './report.entity';
export declare class Post {
    id: number;
    title: string;
    details: string;
    createdDate: Date;
    updatedDate: Date;
    student: number;
    comments: Comment[];
    reports: Report[];
}
