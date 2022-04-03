"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const comment_service_1 = tslib_1.__importDefault(require("../services/comment.service"));
const exceptions_1 = require("../exceptions");
class CommentController {
    constructor() {
        this.commentService = new comment_service_1.default();
        this.create = async (req) => {
            const params = Object.assign({}, req.body);
            const { postId } = req.query;
            if (!postId) {
                throw new exceptions_1.BadRequestException("required post id");
            }
            const comment = await this.commentService.createComment(postId, params);
            return comment;
        };
        this.findByUserId = async (req, res) => {
            const { user } = res.locals;
            const comments = await this.commentService.findByUserIdAndSortByPostId(user.id);
            return comments;
        };
        this.findByPostId = async (req) => {
            const postId = req.params.postId;
            const comments = await this.commentService.findByPostId(postId);
            return comments;
        };
        this.delete = async (req, res) => {
            const { user } = res.locals;
            const commentId = req.params.commentId;
            const comment = await this.commentService.deletedComment(commentId, user.id);
            return comment;
        };
    }
}
exports.default = CommentController;
//# sourceMappingURL=comment.controller.js.map