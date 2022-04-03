"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("../services/user.service"));
class AuthController {
    constructor() {
        this.userService = new user_service_1.default();
        this.findAll = async (req, res, next) => {
            const users = await this.userService.findAllUser();
            return users;
        };
        this.findOneById = async (req, res, next) => {
            const userId = req.params.id;
            const user = await this.userService.findUserById(userId);
            return user;
        };
        this.create = async (req, res, next) => {
            const params = Object.assign({}, req.body);
            const user = await this.userService.createUser(params);
            return user;
        };
        this.update = async (req, res, next) => {
            const userId = req.params.id;
            const params = Object.assign({}, req.body);
            const user = await this.userService.updateUser(userId, params);
            return user;
        };
        this.delete = async (req, res, next) => {
            const userId = req.params.id;
            const user = await this.userService.deleteUser(userId);
            return user;
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=user.controller.js.map