"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const bcrypt_1 = require("bcrypt");
const exceptions_1 = require("../exceptions");
const jwt_1 = require("../lib/jwt");
class AuthService {
    constructor() {
        this.User = user_model_1.default;
    }
    async signUp(userData) {
        const hasUser = await this.User.findOne({ email: userData.email });
        if (hasUser)
            throw new exceptions_1.BadRequestException("Email is already exists.");
        const encryptedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const now = new Date().toISOString();
        const createdUserData = await this.User.create(Object.assign(Object.assign({}, userData), { password: encryptedPassword, createdAt: now, updatedAt: now }));
        return createdUserData;
    }
    async signIn(userData) {
        const user = await this.User.findOne({ email: userData.email });
        if (!user)
            throw new exceptions_1.BadRequestException("Email or password is incorrect.");
        const isValidPassword = await (0, bcrypt_1.compare)(userData.password, user.password);
        if (!isValidPassword)
            throw new exceptions_1.BadRequestException("Email or password is incorrect.");
        const payload = { id: user._id.toString(), nick: user.nick };
        const token = (0, jwt_1.create)(payload);
        return { token };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map