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
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hiring_entity_1 = require("../Db/hiring.entity");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("../Db/job.entity");
let HrService = exports.HrService = class HrService {
    constructor(hrRepo, jobRepo) {
        this.hrRepo = hrRepo;
        this.jobRepo = jobRepo;
    }
    deleteJob(id) {
        return '';
    }
    forgetpassword(id, data) {
        return '';
    }
    passwordChange(id, data) {
        return '';
    }
    deleteProfile(id) {
        return '';
    }
    updateProfile(id, hr) {
        return '';
    }
    myProfile(id) {
        return '';
    }
    dashboard() {
        return '';
    }
    loginHr(hr) {
        return '';
    }
    addHr(hr) {
        return '';
    }
    addJob(data, id) {
        data.createdDate = new Date();
        data.updatedDate = new Date();
        data.type = 'Hr';
        data.hr = id;
        return this.jobRepo.save(data);
    }
    async deleteJobByHrId(id, email) {
        const hr = await this.hrRepo.findOneBy({ email: email });
        return this.jobRepo.delete({ id: id, hr: hr.id });
    }
    async getJobByHrId(id) {
        return this.hrRepo.find({
            where: { id: id },
            relations: {
                jobs: true,
            },
        });
    }
    async updateJob(id, data, email) {
        const hr = await this.hrRepo.findOneBy({ email: email });
        return this.jobRepo.update({ id: id, hr: hr.id }, data);
    }
};
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hiring_entity_1.Hr)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HrService);
//# sourceMappingURL=hr.service.js.map