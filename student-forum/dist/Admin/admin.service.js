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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const moderator_entity_1 = require("../Db/moderator.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../Db/admin.entity");
const bcrypt = require("bcrypt");
const student_entity_1 = require("../Db/student.entity");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminRepo, moderatorRepo, studentRepo) {
        this.adminRepo = adminRepo;
        this.moderatorRepo = moderatorRepo;
        this.studentRepo = studentRepo;
    }
    async getStudentByAdminId(email) {
        return this.adminRepo.find({
            where: { email: email },
            relations: {
                students: true,
            },
        });
    }
    adminProfile(id) {
        return '';
    }
    accessControl(id, access) {
        return '';
    }
    deleteHr(id) {
        return '';
    }
    updateHr(id, hr) {
        return '';
    }
    getHrById(id) {
        return '';
    }
    getAllHr() {
        return '';
    }
    addHr(hr) {
        return '';
    }
    deleteModerator(id) {
        return '';
    }
    deleteStudent(id) {
        return '';
    }
    updateModerator(id, moderator) {
        return '';
    }
    getModeratorById(id) {
        return '';
    }
    getAllModerator() {
        return '';
    }
    async addModerator(moderator) {
        const admin = await this.adminRepo.findOneBy({ id: 1 });
        moderator.status = 'Inactive';
        moderator.createdBy = admin.id;
        moderator.createdDate = new Date();
        moderator.updatedDate = new Date();
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(moderator.password, salt);
        moderator.password = hassedpassed;
        return this.moderatorRepo.save(moderator);
    }
    getAllStudent() {
        const res = this.studentRepo.find();
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
    updateStudent(id, student) {
        return '';
    }
    getStudentById() {
        return '';
    }
    async addStudent(student, email) {
        const salt = await bcrypt.genSalt();
        student.password = await bcrypt.hash(student.password, salt);
        const adm = await this.studentRepo.findOneBy({ email: email });
        student.createdByAdmin = adm.id;
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
    async updateAdmin(email, admin) {
        const res = await this.adminRepo.update({ email: email }, admin);
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Admin not found',
            });
        }
    }
    async adminLogin(admin) {
        const adm = await this.adminRepo.findOneBy({ email: admin.email });
        if (adm) {
            const isMatch = await bcrypt.compare(admin.password, adm.password);
            if (isMatch)
                return isMatch;
        }
        else {
            return false;
        }
    }
    async deleteModeratorByAdminId(id) {
        return this.moderatorRepo.delete({ id: id, createdBy: 1 });
    }
    async updateModeratorByAdminId(id, moderator) {
        return this.moderatorRepo.update({ id: id, createdBy: 1 }, moderator);
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(moderator_entity_1.Moderator)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map