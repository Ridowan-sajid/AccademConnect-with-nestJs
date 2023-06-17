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
const Post_dto_1 = require("../Student/dto/Post.dto");
let ModeratorController = exports.ModeratorController = class ModeratorController {
    constructor(moderatorService) {
        this.moderatorService = moderatorService;
    }
    addModerator(moderator, myfileobj) {
        moderator.profileImg = myfileobj.filename;
        return this.moderatorService.addModerator(moderator);
    }
    loginModerator(moderator) {
        return this.moderatorService.loginModerator(moderator);
    }
    myProfile(id) {
        return this.moderatorService.myProfile(id);
    }
    updateProfile(name, moderator) {
        return this.moderatorService.editProfile(name, moderator);
    }
    deleteProfile(id) {
        return this.moderatorService.deleteProfile(id);
    }
    getDashboard() {
        return this.moderatorService.getDashboard();
    }
    deletStudent(id) {
        return this.moderatorService.deleteStudent(id);
    }
    addPost(data) {
        return this.moderatorService.createPost(data);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_2.ModeratorLoginDto]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "loginModerator", null);
__decorate([
    (0, common_1.Get)('/myprofile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Moderator_dto_1.ModeratorDto]),
    __metadata("design:returntype", Moderator_dto_1.ModeratorDto)
], ModeratorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/deleteProfile'),
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
    (0, common_1.Delete)('/deletestudent/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ModeratorController.prototype, "deletStudent", null);
__decorate([
    (0, common_1.Post)('/createpost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_dto_1.PostDto]),
    __metadata("design:returntype", void 0)
], ModeratorController.prototype, "addPost", null);
exports.ModeratorController = ModeratorController = __decorate([
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [moderator_service_1.ModeratorService])
], ModeratorController);
//# sourceMappingURL=moderator.controller.js.map