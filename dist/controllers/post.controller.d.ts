import PostService from "../services/post.service";
import { Handler } from "express";
export default class PostController {
    postService: PostService;
    findAll: Handler;
    findOneById: Handler;
    create: Handler;
    update: Handler;
    delete: Handler;
}
