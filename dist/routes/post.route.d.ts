import PostController from "../controllers/post.controller";
import { Routes } from "../interfaces";
export default class PostRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    postController: PostController;
    constructor();
    private initializeRoutes;
}
