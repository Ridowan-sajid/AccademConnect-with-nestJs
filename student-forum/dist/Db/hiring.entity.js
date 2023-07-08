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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hr = void 0;
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
const moderator_entity_1 = require("./moderator.entity");
const admin_entity_1 = require("./admin.entity");
const student_entity_1 = require("./student.entity");
const comment_entity_1 = require("./comment.entity");
const report_entity_1 = require("./report.entity");
const offer_entity_1 = require("./offer.entity");
let Hr = exports.Hr = class Hr {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Hr.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Hr.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Hr.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "profileImg", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hr.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => moderator_entity_1.Moderator, (moderator) => moderator.students),
    __metadata("design:type", Number)
], Hr.prototype, "createdByModerator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.students),
    __metadata("design:type", Number)
], Hr.prototype, "createdByAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.Job, (moderator) => moderator.hr),
    __metadata("design:type", Array)
], Hr.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.hr),
    __metadata("design:type", Array)
], Hr.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.hr),
    __metadata("design:type", Array)
], Hr.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offer_entity_1.Offer, (offer) => offer.hrId),
    __metadata("design:type", Array)
], Hr.prototype, "letters", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.Student, (student) => student.connection),
    __metadata("design:type", Array)
], Hr.prototype, "connection", void 0);
exports.Hr = Hr = __decorate([
    (0, typeorm_1.Entity)('Hr')
], Hr);
//# sourceMappingURL=hiring.entity.js.map