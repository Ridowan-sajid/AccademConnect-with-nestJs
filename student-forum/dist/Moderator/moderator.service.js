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
exports.ModeratorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moderator_entity_1 = require("../Db/moderator.entity");
const student_entity_1 = require("../Db/student.entity");
const bcrypt = require("bcrypt");
let ModeratorService = exports.ModeratorService = class ModeratorService {
    async deleteStudentByModeratorId(id, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            return this.studentRepo.delete({ id: id, createdByModerator: mod.id });
        }
        else {
            return 'Should be a moderator';
        }
    }
    async updateStudentByModeratorId(id, student, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        return this.studentRepo.update({ id: id, createdByModerator: mod.id }, student);
    }
    async getStudentByModeratorId(id) {
        return this.moderatorRepo.find({
            where: { id: id },
            relations: {
                students: true,
            },
        });
    }
    constructor(moderatorRepo, studentRepo) {
        this.moderatorRepo = moderatorRepo;
        this.studentRepo = studentRepo;
    }
    async addStudent(student, email) {
        {
            const moderator = await this.moderatorRepo.findOneBy({ email: email });
            student.createdByModerator = moderator.id;
            student.createdDate = new Date();
            student.updatedDate = new Date();
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(student.password, salt);
            student.password = hassedpassed;
            return this.studentRepo.save(student);
        }
    }
    deleteHr(id) {
        return '';
    }
    deleteStudent(id) {
        return '';
    }
    forgetPassword(id, moderator) {
        return '';
    }
    passwordChange(id, moderator) {
        return '';
    }
    getDashboard() {
        return '';
    }
    deleteProfile(id) {
        return '';
    }
    editProfile(id, moderator) {
        return '';
    }
    myProfile(id) {
        return '';
    }
    async loginModerator(moderator) {
        const mod = await this.moderatorRepo.findOneBy({ email: moderator.email });
        if (mod) {
            const isMatch = await bcrypt.compare(moderator.password, mod.password);
            if (isMatch)
                return 'Successfully Logged In';
        }
    }
    addModerator(moderator) {
        return '';
    }
};
exports.ModeratorService = ModeratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(moderator_entity_1.Moderator)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ModeratorService);
//# sourceMappingURL=moderator.service.js.map