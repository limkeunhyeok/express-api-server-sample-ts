import CommentService from "../services/comment.service";
import { Handler } from "express";
export default class CommentController {
    commentService: CommentService;
    create: Handler;
    findByUserId: Handler;
    findByPostId: Handler;
    delete: Handler;
}
