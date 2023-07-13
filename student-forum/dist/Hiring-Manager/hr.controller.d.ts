/// <reference types="multer" />
import { HrService } from './hr.service';
import { ForgetPassHrDto, HrDto, HrLoginDto, PasswordChangeHrDto } from './dto/hr.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';
import { OfferDTO } from 'src/OfferLetter/dto/offer.dto';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import { UpdateHrDto } from './dto/updatehr.dto';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    addHr(hr: HrDto, myfileobj: Express.Multer.File): any;
    loginHr(hr: HrLoginDto, session: any): Promise<any>;
    getDashboard(): any;
    myProfile(session: any): any;
    updateProfile(data: UpdateHrDto, session: any): any;
    deleteProfile(id: number): any;
    changePassword(data: PasswordChangeHrDto, session: any): any;
    forgetPassword(id: number, data: ForgetPassHrDto): any;
    addJob(data: JobDto, session: any): Promise<JobDto & import("../Db/job.entity").Job>;
    getMyJobPost(session: any): any;
    getJobByHrId(id: number, session: any): any;
    deleteJobByHr(id: number, session: any): any;
    updatePost(data: UpdateJobDto, id: number, session: any): Promise<any>;
    Logout(session: any): any;
    getPost(session: any): any;
    getJob(session: any): any;
    addLetter(id: number, data: OfferDTO, session: any): Promise<OfferDTO & import("../Db/offer.entity").Offer>;
    getCandidateList(id: number, session: any): any;
    addComment(id: number, data: CommentDto, session: any): Promise<any>;
    getPostComment(id: number, session: any): any;
    deleteComment(id: number, session: any): any;
    addReplyComment(id: number, data: CommentDto, session: any): Promise<any>;
    getReplyComment(id: number, session: any): any;
    getting(res: any, session: any): Promise<any>;
    deleteStudent(session: any): any;
}
