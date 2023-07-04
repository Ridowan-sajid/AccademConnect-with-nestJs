/// <reference types="multer" />
import { HrService } from './hr.service';
import { ForgetPassHrDto, HrDto, HrLoginDto, PasswordChangeHrDto } from './dto/hr.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    addHr(hr: HrDto, myfileobj: Express.Multer.File): HrDto;
    loginHr(hr: HrLoginDto): any;
    getDashboard(): any;
    myProfile(id: number): HrDto;
    updateProfile(id: number, hr: HrDto): HrDto;
    deleteProfile(id: number): any;
    changePassword(id: number, data: PasswordChangeHrDto): any;
    forgetPassword(id: number, data: ForgetPassHrDto): any;
    deleteJob(id: number): string;
    addJob(id: number, data: JobDto): Promise<JobDto & import("../Db/job.entity").Job>;
    getJobByHrId(id: number): any;
    deleteJobByHrId(id: number, session: any): any;
    updateJobByHrId(data: UpdateJobDto, id: number, session: any): Promise<any>;
}
