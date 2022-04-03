"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exceptions_1 = require("../exceptions");
const post_model_1 = tslib_1.__importDefault(require("../models/post.model"));
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const category_model_1 = tslib_1.__importDefault(require("../models/category.model"));
class PostService {
    constructor() {
        this.Post = post_model_1.default;
        this.User = user_model_1.default;
        this.Category = category_model_1.default;
    }
    async findAll() {
        const posts = await this.Post.find({});
        return posts;
    }
    async findAllByUserId(userId) {
        const posts = await this.Post.find({ userId });
        return posts;
    }
    async findAllByCategoryId(categoryId) {
        const posts = await this.Post.find({ categoryId });
        return posts;
    }
    async findOneByPostId(postId) {
        const hasPost = await this.Post.findOne({ _id: postId });
        if (!hasPost)
            throw new exceptions_1.BadRequestException("Post does not exists.");
        return hasPost;
    }
    async createPost(postData) {
        const now = new Date().toISOString();
        const hasUser = await this.User.findById({ _id: postData.userId });
        if (!hasUser)
            throw new exceptions_1.BadRequestException("User does not exists.");
        const hasCategory = await this.Category.findById({ _id: postData.categoryId });
        if (!hasCategory)
            throw new exceptions_1.BadRequestException("Category does not exists.");
        const createdPostData = await this.Post.create(Object.assign(Object.assign({}, postData), { createdAt: now, updatedAt: now }));
        return createdPostData;
    }
    async updatePost(postId, postData) {
        const hasPost = await this.Post.findOne({ _id: postId });
        if (!hasPost)
            throw new exceptions_1.BadRequestException("Post does not exists.");
        const now = new Date().toISOString();
        const updatedPostData = await this.Post.findByIdAndUpdate(postId, Object.assign(Object.assign({}, postData), { updatedAt: now }), {
            new: true
        });
        return updatedPostData;
    }
    async deletePost(postId) {
        const hasPost = await this.Post.findOne({ _id: postId });
        if (!hasPost)
            throw new exceptions_1.BadRequestException("Post does not exists.");
        const deletedPostData = await this.Post.findByIdAndDelete(postId);
        return deletedPostData;
    }
}
exports.default = PostService;
//# sourceMappingURL=post.service.js.map