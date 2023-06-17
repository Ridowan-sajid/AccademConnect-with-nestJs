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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const Student_dto_1 = require("./dto/Student.dto");
const StudentLogin_dto_1 = require("./dto/StudentLogin.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const Post_dto_1 = require("./dto/Post.dto");
let StudentController = exports.StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    addStudent(student, myfileobj) {
        student.profileImg = myfileobj.filename;
        return this.studentService.addStudent(student);
    }
    loginStudent(student) {
        return this.studentService.loginStudent(student);
    }
    myProfile(id) {
        return this.studentService.myProfile(id);
    }
    updateProfile(id, student) {
        return this.studentService.editProfile(id, student);
    }
    deleteProfile(id) {
        return this.studentService.deleteProfile(id);
    }
    getDashboard() {
        return this.studentService.getDashboard();
    }
    addPost(data) {
        return this.studentService.addPost(data);
    }
    updatePost(data, id) {
        return this.studentService.updatePost(id, data);
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
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], StudentController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentLogin_dto_1.StudentLoginDto]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "loginStudent", null);
__decorate([
    (0, common_1.Get)('/myprofile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], StudentController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Student_dto_1.StudentDto]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], StudentController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/deleteProfile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Student_dto_1.StudentDto)
], StudentController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('/createpost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_dto_1.PostDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addPost", null);
__decorate([
    (0, common_1.Put)('/updatepost/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_dto_1.PostDto, Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "updatePost", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map