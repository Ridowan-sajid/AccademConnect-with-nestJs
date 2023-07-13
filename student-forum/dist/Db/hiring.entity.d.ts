import { Job } from './job.entity';
import { Comment } from './comment.entity';
import { Report } from './report.entity';
import { Offer } from './offer.entity';
export declare class Hr {
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
    createdByModerator: number;
    createdByAdmin: number;
    jobs: Job[];
    comments: Comment[];
    reports: Report[];
    letters: Offer[];
    sthr: Hr[];
}
