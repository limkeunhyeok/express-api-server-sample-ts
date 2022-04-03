"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = exports.CreatePostDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreatePostDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
exports.CreatePostDto = CreatePostDto;
class UpdatePostDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePostDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePostDto.prototype, "content", void 0);
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=post.dto.js.map