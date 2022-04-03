"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDto = exports.SignUpDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class SignUpDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Length)(8, 16),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "nick", void 0);
exports.SignUpDto = SignUpDto;
class SignInDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Length)(8, 16),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;
//# sourceMappingURL=auth.dto.js.map