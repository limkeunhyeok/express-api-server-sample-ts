"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCategoryDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCategoryDto.prototype, "title", void 0);
exports.CreateCategoryDto = CreateCategoryDto;
class UpdateCategoryDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCategoryDto.prototype, "title", void 0);
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=category.dto.js.map