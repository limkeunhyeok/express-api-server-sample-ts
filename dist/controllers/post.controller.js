"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const post_service_1 = tslib_1.__importDefault(require("../services/post.service"));
class PostController {
    constructor() {
        this.postService = new post_service_1.default();
        this.findAll = async () => {
            const posts = await this.postService.findAll();
            return posts;
        };
        this.findOneById = async (req) => {
            const postId = req.params.id;
            const post = await this.postService.findOneByPostId(postId);
            return post;
        };
        this.create = async (req) => {
            const params = Object.assign({}, req.body);
            const post = await this.postService.createPost(params);
            return post;
        };
        this.update = async (req) => {
            const postId = req.params.id;
            const params = Object.assign({}, req.body);
            const post = await this.postService.updatePost(postId, params);
            return post;
        };
        this.delete = async (req) => {
            const postId = req.params.id;
            const post = await this.postService.deletePost(postId);
            return post;
        };
    }
}
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map