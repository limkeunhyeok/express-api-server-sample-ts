"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_controller_1 = tslib_1.__importDefault(require("../controllers/user.controller"));
const wrap_1 = require("../lib/wrap");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const dtos_1 = require("../dtos");
class UserRoute {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = (0, express_1.Router)();
        router
            .get("/", (0, wrap_1.wrap)(this.userController.findAll))
            .get("/:id", (0, wrap_1.wrap)(this.userController.findOneById))
            .post("/", (0, validation_middleware_1.default)(dtos_1.CreateUserDto, "body"), (0, wrap_1.wrap)(this.userController.create))
            .put("/:id", (0, validation_middleware_1.default)(dtos_1.UpdateUserDto, "body"), (0, wrap_1.wrap)(this.userController.update))
            .delete("/:id", (0, wrap_1.wrap)(this.userController.delete));
        this.router.use(this.path, router);
    }
}
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map