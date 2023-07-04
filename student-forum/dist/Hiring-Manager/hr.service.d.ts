import { ForgetPassHrDto, HrDto, HrLoginDto, PasswordChangeHrDto } from './dto/hr.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';
import { Hr } from 'src/Db/hiring.entity';
import { Repository } from 'typeorm';
import { Job } from 'src/Db/job.entity';
export declare class HrService {
    private hrRepo;
    private jobRepo;
    constructor(hrRepo: Repository<Hr>, jobRepo: Repository<Job>);
    deleteJob(id: number): string;
    forgetpassword(id: number, data: ForgetPassHrDto): any;
    passwordChange(id: number, data: PasswordChangeHrDto): any;
    deleteProfile(id: number): any;
    updateProfile(id: number, hr: HrDto): any;
    myProfile(id: number): any;
    dashboard(): any;
    loginHr(hr: HrLoginDto): any;
    addHr(hr: HrDto): any;
    addJob(data: JobDto, id: number): Promise<JobDto & Job>;
    deleteJobByHrId(id: number, email: string): Promise<any>;
    getJobByHrId(id: number): Promise<any>;
    updateJob(id: number, data: UpdateJobDto, email: string): Promise<any>;
}
