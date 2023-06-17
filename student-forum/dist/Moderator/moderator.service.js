"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorService = void 0;
const common_1 = require("@nestjs/common");
let ModeratorService = exports.ModeratorService = class ModeratorService {
    getDashboard() {
        return 'All User';
    }
    addModerator(moderator) {
        return moderator;
    }
    loginModerator(moderator) {
        return moderator;
    }
    myProfile(id) {
        return id;
    }
    editProfile(name, moderator) {
        return moderator;
    }
    deleteProfile(id) {
        return 'deleted';
    }
    deleteStudent(id) {
        return 'student deleted';
    }
    createPost(post) {
        return 'post created';
    }
};
exports.ModeratorService = ModeratorService = __decorate([
    (0, common_1.Injectable)()
], ModeratorService);
//# sourceMappingURL=moderator.service.js.map