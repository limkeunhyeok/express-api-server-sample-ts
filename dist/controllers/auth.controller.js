"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.signUp = async (req, res, next) => {
            const userData = Object.assign({}, req.body);
            const signUpUserData = await this.authService.signUp(userData);
            return signUpUserData;
        };
        this.signIn = async (req, res, next) => {
            const userData = Object.assign({}, req.body);
            const token = await this.authService.signIn(userData);
            return token;
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map