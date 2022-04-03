"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const bcrypt_1 = require("bcrypt");
const exceptions_1 = require("../exceptions");
class UserService {
    constructor() {
        this.User = user_model_1.default;
    }
    async findAllUser() {
        const users = await this.User.find({});
        return users;
    }
    async findUserById(userId) {
        const hasUser = await this.User.findOne({ _id: userId });
        if (!hasUser)
            throw new exceptions_1.BadRequestException("The user does not exists.");
        return hasUser;
    }
    async createUser(userData) {
        const hasUser = await this.User.findOne({ email: userData.email });
        if (hasUser)
            throw new exceptions_1.BadRequestException("Email is already exists.");
        const encryptedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const now = new Date().toISOString();
        const createdUserData = await this.User.create(Object.assign(Object.assign({}, userData), { password: encryptedPassword, createdAt: now, updatedAt: now }));
        return createdUserData;
    }
    async updateUser(userId, userData) {
        const hasUser = await this.User.findOne({ _id: userId });
        if (!hasUser)
            throw new exceptions_1.BadRequestException("The user does not exist.");
        const encryptedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const now = new Date().toISOString();
        const updatedUserData = await this.User.findByIdAndUpdate(userId, Object.assign(Object.assign({}, userData), { password: encryptedPassword, updatedAt: now }), {
            new: true
        });
        return updatedUserData;
    }
    async deleteUser(userId) {
        const hasUser = await this.User.findOne({ _id: userId });
        if (!hasUser)
            throw new exceptions_1.BadRequestException("The user does not exist.");
        const deletedUserData = await this.User.findByIdAndDelete(userId);
        return deletedUserData;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map