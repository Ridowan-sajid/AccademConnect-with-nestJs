"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../Db/student.entity");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../Db/post.entity");
const bcrypt = require("bcrypt");
const comment_entity_1 = require("../Db/comment.entity");
const hiring_entity_1 = require("../Db/hiring.entity");
const report_entity_1 = require("../Db/report.entity");
let StudentService = exports.StudentService = class StudentService {
    async addReport(data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            const res = await this.reportRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'There is something wrong',
            });
        }
    }
    async createNetwork(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            const hr = await this.hrRepo.findOneBy({ id: id });
            console.log(std.connectionS);
            std.connectionS.push(hr);
            await this.studentRepo.save(std);
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getReplyComment(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        console.log(std);
        if (std) {
            const res = await this.commentRepo.find({
                where: { id: id },
                relations: {
                    childComments: true,
                },
            });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async addReplyComment(id, data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            data.parentComment = id;
            const res = await this.commentRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    async deleteComment(id, email) {
        const res = await this.studentRepo.findOneBy({ email: email });
        if (res) {
            const com = await this.commentRepo.delete(id);
            return com;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getPostComment(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            const res = await this.postRepo.find({
                where: { id: id },
                relations: {
                    comments: { childComments: true },
                },
            });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    constructor(studentRepo, postRepo, commentRepo, hrRepo, reportRepo) {
        this.studentRepo = studentRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.hrRepo = hrRepo;
        this.reportRepo = reportRepo;
    }
    async addComment(id, data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            data.post = id;
            const res = await this.commentRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    async getDetailsPost(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            const res = await this.postRepo.findOneBy({ id: id });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Post Not Found',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getAllPost(email) {
        const res = await this.postRepo.find();
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async deletePostByStudentId(id, email) {
        const stud = await this.studentRepo.findOneBy({ email: email });
        if (stud) {
            const res = await this.postRepo.delete({ id: id, student: stud.id });
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the post',
            });
        }
    }
    async getMyPost(email) {
        const res = await this.studentRepo.find({
            where: { email: email },
            relations: {
                posts: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async updatePost(id, data, email) {
        const stud = await this.studentRepo.findOneBy({ email: email });
        if (stud) {
            data.updatedDate = new Date();
            const res = await this.postRepo.update({ id: id, student: stud.id }, data);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the post',
            });
        }
    }
    forgetpassword(id, student) {
        return '';
    }
    async passwordChange(changedPass, email) {
        const student = await this.studentRepo.findOneBy({
            email: email,
        });
        const isMatch = await bcrypt.compare(changedPass.oldPassword, student.password);
        if (isMatch) {
            const salt = await bcrypt.genSalt();
            student.password = await bcrypt.hash(changedPass.newPassword, salt);
            const res = await this.studentRepo.update(student.id, student);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async addPost(data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.createdDate = new Date();
            data.updatedDate = new Date();
            data.student = student.id;
            console.log(data.student);
            const res = await this.postRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    getDashboard() {
        return '';
    }
    deleteProfile(id) {
        return '';
    }
    async editProfile(student, email) {
        const res = await this.studentRepo.update({ email: email }, student);
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            });
        }
    }
    async myProfile(email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            return student;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async loginStudent(student) {
        const res = await this.studentRepo.findOneBy({ email: student.email });
        if (res) {
            const isMatch = await bcrypt.compare(student.password, res.password);
            if (isMatch)
                return isMatch;
        }
        else {
            return false;
        }
    }
    async addStudent(student) {
        const salt = await bcrypt.genSalt();
        student.password = await bcrypt.hash(student.password, salt);
        const res = await this.studentRepo.save(student);
        if (res) {
            return res;
        }
        else {
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'There is something wrong',
            });
        }
    }
    async getImages(res, email) {
        const admin = await this.studentRepo.findOneBy({ email: email });
        if (admin) {
            res.sendFile(admin.profileImg, { root: './uploads/student' });
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StudentService.prototype, "getImages", null);
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(hiring_entity_1.Hr)),
    __param(4, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map