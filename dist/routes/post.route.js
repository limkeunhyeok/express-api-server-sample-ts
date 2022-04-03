"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const post_controller_1 = tslib_1.__importDefault(require("../controllers/post.controller"));
const wrap_1 = require("../lib/wrap");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const dtos_1 = require("../dtos");
class PostRoute {
    constructor() {
        this.path = "/posts";
        this.router = (0, express_1.Router)();
        this.postController = new post_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = (0, express_1.Router)();
        router
            .post("/", (0, validation_middleware_1.default)(dtos_1.CreatePostDto, "body"), (0, wrap_1.wrap)(this.postController.create))
            .get("/", (0, wrap_1.wrap)(this.postController.findAll))
            .get("/:id", (0, wrap_1.wrap)(this.postController.findOneById))
            .put("/:id", (0, validation_middleware_1.default)(dtos_1.UpdatePostDto, "body"), (0, wrap_1.wrap)(this.postController.update))
            .delete("/:id", (0, wrap_1.wrap)(this.postController.delete));
        this.router.use(this.path, router);
    }
}
exports.default = PostRoute;
//# sourceMappingURL=post.route.js.map