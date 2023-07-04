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
exports.HrController = void 0;
const common_1 = require("@nestjs/common");
const hr_service_1 = require("./hr.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const hr_dto_1 = require("./dto/hr.dto");
const job_dto_1 = require("../Job/dto/job.dto");
const updateJob_dto_1 = require("../Job/dto/updateJob.dto");
let HrController = exports.HrController = class HrController {
    constructor(hrService) {
        this.hrService = hrService;
    }
    addHr(hr, myfileobj) {
        hr.profileImg = myfileobj.filename;
        return this.hrService.addHr(hr);
    }
    loginHr(hr) {
        return this.hrService.loginHr(hr);
    }
    getDashboard() {
        return this.hrService.dashboard();
    }
    myProfile(id) {
        return this.hrService.myProfile(id);
    }
    updateProfile(id, hr) {
        return this.hrService.updateProfile(id, hr);
    }
    deleteProfile(id) {
        return this.hrService.deleteProfile(id);
    }
    changePassword(id, data) {
        return this.hrService.passwordChange(id, data);
    }
    forgetPassword(id, data) {
        return this.hrService.forgetpassword(id, data);
    }
    deleteJob(id) {
        return this.hrService.deleteJob(id);
    }
    addJob(id, data) {
        return this.hrService.addJob(data, id);
    }
    getJobByHrId(id) {
        return this.hrService.getJobByHrId(id);
    }
    deleteJobByHrId(id, session) {
        return this.hrService.deleteJobByHrId(id, session.email);
    }
    updateJobByHrId(data, id, session) {
        return this.hrService.updateJob(id, data, session.email);
    }
};
__decorate([
    (0, common_1.Post)('/Register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 2000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrDto, Object]),
    __metadata("design:returntype", hr_dto_1.HrDto)
], HrController.prototype, "addHr", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrLoginDto]),
    __metadata("design:returntype", Object)
], HrController.prototype, "loginHr", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HrController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('/myprofile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", hr_dto_1.HrDto)
], HrController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hr_dto_1.HrDto]),
    __metadata("design:returntype", hr_dto_1.HrDto)
], HrController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/deleteProfile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], HrController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Patch)('/changePassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hr_dto_1.PasswordChangeHrDto]),
    __metadata("design:returntype", Object)
], HrController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hr_dto_1.ForgetPassHrDto]),
    __metadata("design:returntype", Object)
], HrController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Delete)('/deleteJob/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Post)('/createjob/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, job_dto_1.JobDto]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addJob", null);
__decorate([
    (0, common_1.Get)('/jobWithHr/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getJobByHrId", null);
__decorate([
    (0, common_1.Delete)('/jobWithHr/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "deleteJobByHrId", null);
__decorate([
    (0, common_1.Put)('/jobWithHr/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateJob_dto_1.UpdateJobDto, Number, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateJobByHrId", null);
exports.HrController = HrController = __decorate([
    (0, common_1.Controller)('hr'),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrController);
//# sourceMappingURL=hr.controller.js.map