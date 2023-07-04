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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const adminLogin_dto_1 = require("./dto/adminLogin.dto");
const Student_dto_1 = require("../Student/dto/Student.dto");
const Moderator_dto_1 = require("../Moderator/dto/Moderator.dto");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
const updateModerator_dto_1 = require("../Moderator/dto/updateModerator.dto");
const hr_dto_1 = require("../Hiring-Manager/dto/hr.dto");
const updatehr_dto_1 = require("../Hiring-Manager/dto/updatehr.dto");
const moderatorAccess_dto_1 = require("../Moderator/dto/moderatorAccess.dto");
const updateStudent_dto_1 = require("../Student/dto/updateStudent.dto");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    adminLogin(admin) {
        return this.adminService.adminLogin(admin);
    }
    updateAdmin(id, admin) {
        return this.adminService.updateAdmin(id, admin);
    }
    addStudent(student, myfileobj) {
        student.profileImg = myfileobj.filename;
        return this.adminService.addStudent(student);
    }
    getAllStudent() {
        return this.adminService.getAllStudent();
    }
    getStudentById(id) {
        return this.adminService.getStudentById();
    }
    getModeratorByAdminId(id) {
        return this.adminService.getModeratorByAdminId(id);
    }
    deleteModeratorByAdminId(id) {
        return this.adminService.deleteModeratorByAdminId(id);
    }
    updateModeratorByAdminId(id, moderator, myfileobj) {
        moderator.profileImg = myfileobj.filename;
        return this.adminService.updateModeratorByAdminId(id, moderator);
    }
    updateStudent(id, student) {
        return this.adminService.updateStudent(id, student);
    }
    deleteStudent(id) {
        return this.adminService.deleteStudent(id);
    }
    addModerator(moderator, myfileobj) {
        moderator.profileImg = myfileobj.filename;
        return this.adminService.addModerator(moderator);
    }
    getAllModerator() {
        return this.adminService.getAllModerator();
    }
    getModeratorById(id) {
        return this.adminService.getModeratorById(id);
    }
    updateModerator(id, moderator) {
        return this.adminService.updateModerator(id, moderator);
    }
    deleteModerator(id) {
        return this.adminService.deleteModerator(id);
    }
    addHr(hr, myfileobj) {
        hr.profileImg = myfileobj.filename;
        return this.adminService.addHr(hr);
    }
    getAllHr() {
        return this.adminService.getAllHr();
    }
    getHrById(id) {
        return this.adminService.getHrById(id);
    }
    updateHr(id, hr) {
        return this.adminService.updateHr(id, hr);
    }
    deleteHr(id) {
        return this.adminService.deleteHr(id);
    }
    moderatorAccess(id, access) {
        return this.adminService.accessControl(id, access);
    }
    adminProfile(id) {
        return this.adminService.adminProfile(id);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminLogin_dto_1.AdminLoginDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('/update/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAdmin_dto_1.UpdateAdminDTO]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Post)('/registerStudent'),
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
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], AdminController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('/student'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllStudent", null);
__decorate([
    (0, common_1.Get)('/student/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Get)('/moderatorwithAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getModeratorByAdminId", null);
__decorate([
    (0, common_1.Delete)('/moderatorwithAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteModeratorByAdminId", null);
__decorate([
    (0, common_1.Put)('/moderatorwithAdmin/:id'),
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
            destination: './uploads/moderator',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateModerator_dto_1.UpdateModeratorDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateModeratorByAdminId", null);
__decorate([
    (0, common_1.Put)('/updateStudent/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateStudent_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/deleteStudent/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Post)('/RegisterModerator'),
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
            destination: './uploads/moderator',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.ModeratorDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "addModerator", null);
__decorate([
    (0, common_1.Get)('/moderator'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllModerator", null);
__decorate([
    (0, common_1.Get)('/moderator/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getModeratorById", null);
__decorate([
    (0, common_1.Put)('/moderator/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateModerator_dto_1.UpdateModeratorDto]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], AdminController.prototype, "updateModerator", null);
__decorate([
    (0, common_1.Delete)('/moderator/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteModerator", null);
__decorate([
    (0, common_1.Post)('/RegisterHr'),
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
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "addHr", null);
__decorate([
    (0, common_1.Get)('/hr'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllHr", null);
__decorate([
    (0, common_1.Get)('/hr/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getHrById", null);
__decorate([
    (0, common_1.Put)('/hr/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatehr_dto_1.UpdateHrDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateHr", null);
__decorate([
    (0, common_1.Delete)('/hr/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteHr", null);
__decorate([
    (0, common_1.Patch)('moderatorAccess/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, moderatorAccess_dto_1.ModeratorAccessDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "moderatorAccess", null);
__decorate([
    (0, common_1.Get)('/profile/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "adminProfile", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map