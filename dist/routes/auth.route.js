"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const wrap_1 = require("../lib/wrap");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const dtos_1 = require("../dtos");
class AuthRoute {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = (0, express_1.Router)();
        router
            .post("/signUp", (0, validation_middleware_1.default)(dtos_1.SignUpDto, "body"), (0, wrap_1.wrap)(this.authController.signUp))
            .post("/signIn", (0, validation_middleware_1.default)(dtos_1.SignInDto, "body"), (0, wrap_1.wrap)(this.authController.signIn));
        this.router.use(this.path, router);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map