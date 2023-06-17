"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
let StudentService = exports.StudentService = class StudentService {
    getDashboard() {
        return 'Dashboard';
    }
    addStudent(student) {
        return student;
    }
    loginStudent(student) {
        return student;
    }
    myProfile(id) {
        return id;
    }
    editProfile(id, student) {
        return student;
    }
    deleteProfile(id) {
        return 'deleted';
    }
    addPost(post) {
        return 'Post added';
    }
    updatePost(id, post) {
        return post;
    }
};
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)()
], StudentService);
//# sourceMappingURL=student.service.js.map