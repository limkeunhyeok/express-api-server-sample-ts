import CommentController from "../controllers/comment.controller";
import { Routes } from "../interfaces";
export default class CommentRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    commentController: CommentController;
    constructor();
    private initializeRoutes;
}
