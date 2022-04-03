"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const comment_controller_1 = tslib_1.__importDefault(require("../controllers/comment.controller"));
const wrap_1 = require("../lib/wrap");
const express_1 = require("express");
const dtos_1 = require("../dtos");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
class CommentRoute {
    constructor() {
        this.path = "/comments";
        this.router = (0, express_1.Router)();
        this.commentController = new comment_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = (0, express_1.Router)();
        router
            .post("/", (0, validation_middleware_1.default)(dtos_1.CreateCommentDto, "body"), (0, wrap_1.wrap)(this.commentController.create))
            .get("/", (0, wrap_1.wrap)(this.commentController.findByUserId))
            .get("/:postId", (0, wrap_1.wrap)(this.commentController.findByPostId))
            .delete("/:commentId", (0, wrap_1.wrap)(this.commentController.delete));
        this.router.use(this.path, router);
    }
}
exports.default = CommentRoute;
//# sourceMappingURL=comment.route.js.map