"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exceptions_1 = require("../exceptions");
const comment_model_1 = tslib_1.__importDefault(require("../models/comment.model"));
const post_model_1 = tslib_1.__importDefault(require("../models/post.model"));
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const exceptions_2 = require("../exceptions");
class CommentService {
    constructor() {
        this.Comment = comment_model_1.default;
        this.Post = post_model_1.default;
        this.User = user_model_1.default;
    }
    async createComment(postId, commentData) {
        const hasUser = await this.User.findOne({ _id: commentData.userId });
        if (!hasUser)
            throw new exceptions_1.BadRequestException("User does not exists.");
        const hasPost = await this.Post.findOne({ _id: postId });
        if (!hasPost)
            throw new exceptions_1.BadRequestException("Post does not exists.");
        const now = new Date().toISOString();
        const createdCommentData = await this.Comment.create(Object.assign(Object.assign({}, commentData), { postId, createdAt: now }));
        return createdCommentData;
    }
    async findByUserIdAndSortByPostId(userId) {
        const comments = await this.Comment.find({ userId });
        const postIdSet = new Set(comments.map(comment => comment.postId.toString()));
        let result = [];
        for (const postId of postIdSet) {
            const post = await this.Post.findOne({ _id: postId });
            const data = {
                postId,
                title: post.title,
                comments: comments.filter((comment) => comment.postId.toString() === postId),
            };
            result = [...result, data];
        }
        return result;
    }
    async findByPostId(postId) {
        const commnets = await this.Comment.find({ postId });
        return commnets;
    }
    async deletedComment(commentId, userId) {
        const hasComment = await this.Comment.findOne({ _id: commentId });
        if (!hasComment)
            throw new exceptions_1.BadRequestException("Comment does not exists");
        if (hasComment.userId.toString() !== userId)
            throw new exceptions_2.UnauthorizedException("Access is denied.");
        const deletedComment = await this.Comment.findByIdAndDelete(commentId);
        return deletedComment;
    }
}
exports.default = CommentService;
//# sourceMappingURL=comment.service.js.map