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
exports.ModeratorController = void 0;
const common_1 = require("@nestjs/common");
const moderator_service_1 = require("./moderator.service");
const Moderator_dto_1 = require("./dto/Moderator.dto");
const Moderator_dto_2 = require("./dto/Moderator.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const updateModerator_dto_1 = require("./dto/updateModerator.dto");
const Student_dto_1 = require("../Student/dto/Student.dto");
const updateStudent_dto_1 = require("../Student/dto/updateStudent.dto");
let ModeratorController = exports.ModeratorController = class ModeratorController {
    constructor(moderatorService) {
        this.moderatorService = moderatorService;
    }
    addModerator(moderator, myfileobj) {
        moderator.profileImg = myfileobj.filename;
        return this.moderatorService.addModerator(moderator);
    }
    loginModerator(moderator, session) {
        console.log(moderator);
        session.email = moderator.email;
        return this.moderatorService.loginModerator(moderator);
    }
    myProfile(id) {
        return this.moderatorService.myProfile(id);
    }
    updateProfile(id, moderator) {
        return this.moderatorService.editProfile(id, moderator);
    }
    deleteProfile(id) {
        return this.moderatorService.deleteProfile(id);
    }
    getDashboard() {
        return this.moderatorService.getDashboard();
    }
    changePassword(id, moderator) {
        return this.moderatorService.passwordChange(id, moderator);
    }
    forgetPassword(id, moderator) {
        return this.moderatorService.forgetPassword(id, moderator);
    }
    deletStudent(id) {
        return this.moderatorService.deleteStudent(id);
    }
    deletHr(id) {
        return this.moderatorService.deleteHr(id);
    }
    addStudent(student, myfileobj, session) {
        student.profileImg = myfileobj.filename;
        return this.moderatorService.addStudent(student, session.email);
    }
    getStudentByModeratorId(id) {
        return this.moderatorService.getStudentByModeratorId(id);
    }
    deleteStudentByModeratorId(id, session) {
        return this.moderatorService.deleteStudentByModeratorId(id, session.email);
    }
    updateStudentByModeratorId(id, student, myfileobj, session) {
        student.profileImg = myfileobj.filename;
        return this.moderatorService.updateStudentByModeratorId(id, student, session.email);
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
    __metadata("design:paramtypes", [Moderator_dto_1.ModeratorDto, Object]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "addModerator", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_2.ModeratorLoginDto, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "loginModerator", null);
__decorate([
    (0, common_1.Get)('/myprofile/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateModerator_dto_1.UpdateModeratorDto]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/deleteProfile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Patch)('/changePassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Moderator_dto_1.PasswordChangeModeratorDto]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Moderator_dto_1.ForgetPassModeratorDto]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Delete)('/deletestudent/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ModeratorController.prototype, "deletStudent", null);
__decorate([
    (0, common_1.Delete)('/deleteHr/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ModeratorController.prototype, "deletHr", null);
__decorate([
    (0, common_1.Post)('/RegisterStudent'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 200000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/student',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('/studentwithModerator/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "getStudentByModeratorId", null);
__decorate([
    (0, common_1.Delete)('/studentwithModerator/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deleteStudentByModeratorId", null);
__decorate([
    (0, common_1.Put)('/studentwithModerator/:id'),
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
            destination: './uploads/student',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateStudent_dto_1.UpdateStudentDto, Object, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "updateStudentByModeratorId", null);
exports.ModeratorController = ModeratorController = __decorate([
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [moderator_service_1.ModeratorService])
], ModeratorController);
//# sourceMappingURL=moderator.controller.js.map