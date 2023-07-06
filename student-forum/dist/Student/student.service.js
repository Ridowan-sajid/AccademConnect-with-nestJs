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
let StudentService = exports.StudentService = class StudentService {
    async deletePostByStudentId(id, email) {
        const stud = await this.studentRepo.findOneBy({ email: email });
        return this.postRepo.delete({ id: id, student: stud.id });
    }
    async getPostByStudentId(id) {
        return this.studentRepo.find({
            where: { id: id },
            relations: {
                posts: true,
            },
        });
    }
    async updatePost(id, data, email) {
        const stud = await this.studentRepo.findOneBy({ email: email });
        return this.postRepo.update({ id: id, student: stud.id }, data);
    }
    constructor(studentRepo, postRepo) {
        this.studentRepo = studentRepo;
        this.postRepo = postRepo;
    }
    myPost(id) {
        return '';
    }
    forgetpassword(id, student) {
        return '';
    }
    passwordChange(id, student) {
        return '';
    }
    deletePost(id) {
        return '';
    }
    addPost(data, id) {
        data.createdDate = new Date();
        data.updatedDate = new Date();
        data.studentId = id;
        return this.postRepo.save(data);
    }
    getDashboard() {
        return '';
    }
    deleteProfile(id) {
        return '';
    }
    editProfile(id, student) {
        return '';
    }
    myProfile(id) {
        return '';
    }
    loginStudent(student) {
        return '';
    }
    addStudent(student) {
        return '';
    }
};
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map