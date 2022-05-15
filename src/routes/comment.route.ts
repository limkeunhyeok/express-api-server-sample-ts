import CommentController from "../controllers/comment.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces";
import { Router } from "express";
import { CreateCommentDto } from "../dtos";
import validationMiddleware from "../middlewares/validation.middleware";

export default class CommentRoute implements Routes {
  public path = "/comments";
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .post(
        "/",
        validationMiddleware(CreateCommentDto, "body"),
        wrap(this.commentController.create)
      )
      .get("/", wrap(this.commentController.findByUserId))
      .get("/:postId", wrap(this.commentController.findByPostId))
      .delete("/:commentId", wrap(this.commentController.delete));

    this.router.use(this.path, router);
  }
}
