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
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    addStudent(student, myfileobj) {
        student.profileImg = myfileobj.filename;
        return this.adminService.addStudent(student);
    }
    adminLogin(admin) {
        return this.adminService.adminLogin(admin);
    }
    getAllStudent() {
        return this.adminService.getAllStudent();
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
    updateModerator(id, moderator) {
        return this.adminService.updateModerator(id, moderator);
    }
};
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], AdminController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminLogin_dto_1.AdminLoginDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Get)('/studentList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllStudent", null);
__decorate([
    (0, common_1.Put)('/updateStudent/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Student_dto_1.StudentDto]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], AdminController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/deleteStudent/:id'),
    __param(0, (0, common_1.Param)()),
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
], AdminController.prototype, "addModerator", null);
__decorate([
    (0, common_1.Get)('/moderatorList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllModerator", null);
__decorate([
    (0, common_1.Put)('/updateModerator/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Moderator_dto_1.ModeratorDto]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], AdminController.prototype, "updateModerator", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map