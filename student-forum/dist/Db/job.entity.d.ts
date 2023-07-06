import { Offer } from './offer.entity';
import { Report } from './report.entity';
export declare class Job {
    id: number;
    title: string;
    details: string;
    hr: number;
    letters: Offer[];
    reports: Report[];
}
